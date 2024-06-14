import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux"
import { signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom"

const OAuth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleClickHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                axios.post("/api/auth/google", {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }).then((response) => {
                    dispatch(signInSuccess(response.data))
                    navigate("/");
                }).catch((error) => {
                    if (error && error.response && error.response.data) {
                        dispatch(signInFailure(error.response.data.message));
                    }
                });
            }).catch((error) => {
                console.log("Login failed with google ", error)
            });
    }

    return (
        <div className="w-full mt-2">
            <button type="button" className="bg-[#8C1F28] px-2 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90"
                onClick={googleClickHandler}>
                <div className="flex justify-center items-center">
                    <FcGoogle className="mr-2" />
                    <span>Continue with Google</span>
                </div>
            </button>
        </div>
    )
}

export default OAuth