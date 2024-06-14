import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateListing = () => {
    const [files, setFiles] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        regularPrice: 0,
        discountedPrice: 0,
        bathrooms: 1,
        bedrooms: 1,
        furnished: false,
        parking: false,
        type: "rent",
        offer: false,
        userRef: currentUser._id
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchListing(id);
    }, []);

    const fetchListing = (id) => {
        axios.get(`/api/listing/get/${id}`).then((listing) => {
            setFormData(listing.data);
        }).catch((error) => {

        })
    };

    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldsFilled, setFieldsFilled] = useState({
        name: true,
        description: true,
        address: true

    });

    const imageUploadHandler = (e) => {
        e.preventDefault();
        setImageUploadError(null);
        setUploading(true);
        var promises = [];
        if (files.length === 0) {
            return setImageUploadError("Please select a file for upload.")
        }
        if (files.length >= 7 || (formData.imageUrls.length + files.length) >= 7) {
            return setImageUploadError("You can only upload 6 images per listing.");
        }
        for (var i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
            setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
            setUploading(false);
        }).catch((error) => {
            setUploading(false);
            return setImageUploadError("Images upload failed.");
        });
    };

    const storeImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (progress) => {
                // console.log("progress", progress);
            }, (error) => {
                console.log("Error in file Upload", error);
                reject(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                })
            })
        });
    };

    const deleteImageHandler = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => {
                return i !== index;
            })
        });
        console.log("formdata.urls", formData)
    };

    const handleChange = (e) => {
        if (e.target.id === "sell" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id
            });
        }

        if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            });
        }

        if (e.target.type === "text" || e.target.type === "number" || e.target.type === "textarea") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };

    const createListingHandler = () => {
        if (requiredFieldsValidation()) {
            setError("");
            if (formData.imageUrls.length === 0) {
                return setError("You must upload at least one image.")
            }
            if (Number(formData.regularPrice) < Number(formData.discountedPrice)) {
                return setError("Discounted price must be lower than regular price.")
            }
            setLoading(true);
            axios.post(`/api/listing/update/${formData._id}`, formData).then((response) => {
                console.log("response", response)
                setLoading(false);
                setError("");
                navigate(`/listing/${response.data._id}`);
            }).catch((error) => {
                setLoading(false);
                if (error && error.response && error.response.data) {
                    setError(error.response.data.message);
                }
            });
        }
    };

    const requiredFieldsValidation = () => {
        var result = true;
        var obj = {
            name: true,
            description: true,
            address: true
        }
        if (!formData.name) {
            obj.name = false;
            result = false;
        } else {
            obj.name = true;
        }
        if (!formData.description) {
            obj.description = false;
            result = false;
        } else {
            obj.description = true;
        }
        if (!formData.address) {
            obj.address = false;
            result = false;
        } else {
            obj.address = true;
        }
        setFieldsFilled(obj);
        return result;
    }

    return (
        <div className="font-poppins w-full flex justify-center pt-12 h-screen overflow-auto dark:bg-[#212121]">
            <div className="w-full sm:w-[600px] md:w-[720px] lg:w-[840px] flex flex-col items-center">
                <div>
                    <span className="text-[#344564] font-bold text-2xl dark:text-white">Update a Listing</span>
                </div>

                <div className="mt-6 w-full flex flex-col sm:flex-row items-center sm:items-start">
                    {/* Div One */}
                    <div className="sm:w-1/2 w-full text-sm">
                        {/* Name */}
                        <div className="mx-6 sm:mx-4">
                            <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full outline-none px-4 py-3 border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8]
                            dark:bg-[#2E2E2E] dark:text-white" required></input>
                            {
                                !fieldsFilled.name && (
                                    <div className="flex justify-end mr-1 mt-1 font-medium text-[#BF0413]">
                                        <span className="text-xs">Required*</span>
                                    </div>
                                )
                            }
                        </div>
                        {/* Description */}
                        <div className="mt-4 mx-6 sm:mx-4">
                            <textarea type="text" id="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full outline-none px-4 py-3 border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8]
                            dark:bg-[#2E2E2E] dark:text-white" required></textarea>
                            {
                                !fieldsFilled.description && (
                                    <div className="flex justify-end mr-1 mt-1 font-medium text-[#BF0413]">
                                        <span className="text-xs">Required*</span>
                                    </div>
                                )
                            }
                        </div>
                        {/* Address */}
                        <div className="mt-4 mx-6 sm:mx-4">
                            <input type="text" id="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full outline-none px-4 py-3 border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8]
                            dark:bg-[#2E2E2E] dark:text-white" required></input>
                            {
                                !fieldsFilled.address && (
                                    <div className="flex justify-end mr-1 mt-1 font-medium text-[#BF0413]">
                                        <span className="text-xs">Required*</span>
                                    </div>
                                )
                            }
                        </div>
                        {/* CheckBoxes */}
                        <div className="mt-4 mx-6 sm:mx-4 flex flex-wrap dark:text-white">
                            <div className="flex items-center mr-6 mb-4">
                                <input type="checkbox" id="sell" onChange={handleChange} checked={formData.type === 'sell'} className="w-4 h-4 mr-2"></input>
                                <span className="">Sell</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="checkbox" id="rent" onChange={handleChange} checked={formData.type === 'rent'} className="w-4 h-4 mr-2"></input>
                                <span className="">Rent</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="checkbox" id="parking" onChange={handleChange} checked={formData.parking} className="w-4 h-4 mr-2"></input>
                                <span className="">Parking Spot</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="checkbox" id="furnished" onChange={handleChange} checked={formData.furnished} className="w-4 h-4 mr-2"></input>
                                <span className="">Furnished</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="checkbox" id="offer" onChange={handleChange} checked={formData.offer} className="w-4 h-4 mr-2"></input>
                                <span className="">Offer</span>
                            </div>
                        </div>
                        {/* Numbers */}
                        <div className="mt-2 mx-6 sm:mx-4 flex flex-wrap">
                            <div className="flex items-center mr-6 mb-4">
                                <input type="number" id="bedrooms" min="1" max="10" required onChange={handleChange} value={formData.bedrooms}
                                    className="mr-2 ps-4 pr-1 py-2 outline-none border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8] dark:bg-[#2E2E2E] dark:text-white">
                                </input>
                                <span className="dark:text-white">Beds</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="number" id="bathrooms" min="1" max="10" required onChange={handleChange} value={formData.bathrooms}
                                    className="mr-2 ps-4 pr-1 py-2 outline-none border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8] dark:bg-[#2E2E2E] dark:text-white">
                                </input>
                                <span className="dark:text-white">Baths</span>
                            </div>
                            <div className="flex items-center mr-6 mb-4">
                                <input type="number" id="regularPrice" required onChange={handleChange} value={formData.regularPrice}
                                    className="mr-2 ps-4 pr-1 py-2 outline-none border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8] dark:bg-[#2E2E2E] dark:text-white">
                                </input>
                                <div className="flex flex-col dark:text-white">
                                    <span>Regular Price</span>
                                    <span className="text-xs">(₹ / Month)</span>
                                </div>
                            </div>
                            {
                                formData.offer && (
                                    <div className="flex items-center mr-6 mb-4">
                                        <input type="number" id="discountedPrice" required onChange={handleChange} value={formData.discountedPrice}
                                            className="mr-2 ps-4 pr-1 py-2 border border-[#DFDFDF] outline-none rounded-lg focus:border-[#182625] bg-[#F8F8F8]">
                                        </input>
                                        <div className="flex flex-col dark:text-white">
                                            <span>Discount Price</span>
                                            <span className="text-xs">(₹ / Month)</span>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                    {/* Div Two */}
                    <div className="sm:w-1/2 mt-4 sm:mt-0 w-full text-sm">
                        <div className="mx-6 sm:mx-4 dark:text-white">
                            <span className="font-semibold ">Images: </span>
                            <span>The first image will be the cover (max 6)</span>
                        </div>
                        <div className="mx-6 sm:mx-4 mt-4 flex items-center justify-between">
                            <input type="file" accept="iamges/*" multiple className="border border-[#DFDFDF] p-2 mr-2 dark:text-white" onChange={(e) => setFiles(e.target.files)}></input>
                            <button className="bg-[#5D8A66] px-2 py-2 text-white rounded-lg hover:shadow-2xl hover:opacity-90 disabled:opacity-75" onClick={imageUploadHandler}
                                disabled={uploading}>
                                <span className="">
                                    {
                                        uploading ? 'Uploading...' : 'Upload'
                                    }
                                </span>
                            </button>
                        </div>
                        {
                            imageUploadError && (
                                <div className="mx-6 sm:mx-4 mt-2 font-medium text-[#D62D29]">
                                    <span>{imageUploadError}</span>
                                </div>
                            )
                        }
                        {
                            formData.imageUrls && formData.imageUrls.map((url, index) => (
                                <div className="mx-6 sm:mx-4 mt-2" key={index}>
                                    <div className="w-full flex">
                                        <div className="w-1/2">
                                            <img src={url} alt="img" />
                                        </div>
                                        <div className="flex items-center justify-center w-1/2">
                                            <button onClick={() => deleteImageHandler(index)}>
                                                <MdDelete className="text-black opacity-35 hover:opacity-100 cursor-pointer w-8 h-8 dark:text-white"></MdDelete>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }

                        <div className="mx-6 sm:mx-4 mt-6 mb-6">
                            <button className="bg-[#344564] px-2 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90 disabled:opacity-75" onClick={createListingHandler}
                                disabled={uploading || loading}>
                                <span className="text-base font-medium">
                                    {
                                        loading ? "Updating..." : "Update Listing"
                                    }
                                </span>
                            </button>
                        </div>

                        {
                            error && (
                                <div className="mx-6 sm:mx-4 font-medium text-[#D62D29]">
                                    <span>{error}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateListing;