import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserSuccess, deleteUserSuccess } from "../redux/user/userSlice.js";
import { app } from "../firebase";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const fileRef = useRef();
    const [file, setFile] = useState();
    const [progress, setProgress] = useState();
    const [avatar, setAvatar] = useState();
    const [updateMessage, setUpdateMessage] = useState(null);
    const [error, setError] = useState(null);
    const [userListings, setUserListings] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const updateHandler = (e) => {
        e.preventDefault();
        var payload = {};
        if (email.current.value) {
            payload["email"] = email.current.value;
        }
        if (username.current.value) {
            payload["username"] = username.current.value;
        }
        if (password.current.value) {
            payload["password"] = password.current.value;
        }
        if (avatar) {
            payload["avatar"] = avatar;
        }
        axios.post("/api/user/update", payload).then((response) => {
            dispatch(updateUserSuccess(response.data));
            setUpdateMessage("Profile updated successfully!")
            setTimeout(() => {
                setUpdateMessage(null);
            }, 3000);
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 4000);
            }
        });
    };

    useEffect(() => {
        if (file) {
            fileUploadHandler(file)
        }
    }, [file])

    const fileUploadHandler = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            setProgress(Math.floor(progress))
        }, (error) => {
            console.log("Error in file Upload", error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setAvatar(downloadURL);
            })
        })
    };

    const deleteAccountHandler = (e) => {
        e.preventDefault();
        axios.delete("api/user/delete").then((response) => {
            dispatch(deleteUserSuccess());
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 4000);
            }
        });
    };

    const signOutHandler = (e) => {
        e.preventDefault();
        axios.post("api/auth/signout").then((response) => {
            // We can create a new event for signout, but it will do the same thing what deleteUserSuccess is doing.
            dispatch(deleteUserSuccess());
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 4000);
            }
        });
    };

    const showListingsHandler = () => {
        axios.get("api/user/listings").then((response) => {
            setUserListings(response.data);
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                setError(error.response.data.message);
            }
        });
    };

    const deleteListingHandler = (id) => {
        axios.delete(`api/listing/delete/${id}`).then((response) => {
            showListingsHandler();
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                setError(error.response.data.message);
            }
        });
    };

    return (
        <div className="font-poppins w-full flex justify-center pt-12 h-screen overflow-auto dark:bg-[#212121]">
            <div className="w-[320px] flex flex-col items-center">
                <div>
                    <span className="text-[#344564] font-bold text-2xl dark:text-white">Profile</span>
                </div>

                {/* Avatar */}
                <div className="mt-4 relative">
                    <img alt="profile" src={avatar ? avatar : currentUser.avatar} className="w-24 rounded-full cursor-pointer hover:brightness-75" onClick={() => fileRef.current.click()}></img>
                    <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])}></input>
                </div>

                {
                    (progress > 0 && progress < 100) ? <span>Uploading {progress}%</span> : null
                }

                {/* Username */}
                <div className="mt-6 w-full">
                    <input type="text" ref={username} defaultValue={currentUser.username} placeholder="Username" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
                </div>

                {/* Email */}
                <div className="mt-4 w-full">
                    <input type="email" ref={email} defaultValue={currentUser.email} placeholder="Email" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
                </div>

                {/* Password */}
                <div className="mt-4 w-full">
                    <input type="password" ref={password} placeholder="Password" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
                </div>

                {/* Update User */}
                <div className="mt-6 w-full">
                    <button className="bg-[#344564] px-2 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90"
                        onClick={updateHandler}>
                        Update
                    </button>
                </div>

                {/* Create Listing */}
                <div className="mt-3 w-full">
                    <button className="bg-[#5D8A66] px-2 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90" onClick={() => navigate("/createlisting")}>
                        <span>Create Listing</span>
                    </button>
                </div>

                {
                    updateMessage && (
                        <span className="my-2 font-medium text-[#038C3E]">{updateMessage}</span>
                    )
                }

                {
                    error && (
                        <span className="my-2 font-medium text-[#D62D29]">{error}</span>
                    )
                }

                <div className="text-sm flex w-full justify-between mt-2 px-2">
                    <button className="font-semibold text-[#344564]" onClick={deleteAccountHandler}>Delete Account</button>
                    <button className="font-semibold text-[#344564]" onClick={signOutHandler}>Sign Out</button>
                </div>

                <div className="mt-2 text-sm">
                    <button className="font-semibold text-[#344564]" onClick={showListingsHandler}>Show Listings</button>
                </div>

                {
                    userListings.length > 0 && (
                        <div className="mb-12 mt-6 w-full">
                            <div className="mb-6 text-xl flex font-bold justify-center">
                                <span className="text-[#344564] dark:text-white">Your Listings</span>
                            </div>
                            {
                                userListings.map((listing, index) => (
                                    <div key={index} className="w-full flex flex-col mb-8 border-b-2 pb-4">
                                        <Link to={`/listing/${listing._id}`}>
                                            <div className="">
                                                <div className="w-full flex justify-start text-xs items-center">
                                                    <img src={listing.imageUrls[0]} alt="listing img" className="w-24 h-16 rounded-md"></img>
                                                    <span className="ms-2 font-semibold hover:border-b-2 dark:text-white">{listing.name}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="w-full flex justify-between mt-2">
                                            <button onClick={() => navigate(`/updatelisting/${listing._id}`)} className="w-1/2 mr-4 bg-[#5F734C] py-1 rounded-md text-white text-sm">Edit</button>
                                            <button onClick={() => deleteListingHandler(listing._id)} className="w-1/2 ms-4 bg-[#73030D] py-1 rounded-md text-white text-sm">Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Profile