import React, { useRef } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.js";

const Signin = () => {
    const email = useRef();
    const password = useRef();
    const { error, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signInHandler = (e) => {
        dispatch(signInStart());
        e.preventDefault();
        axios.post("/api/auth/signin", {
            email: email.current.value,
            password: password.current.value
        }).then((response) => {
            dispatch(signInSuccess(response.data))
            navigate("/");
        }).catch((error) => {
            if (error && error.response && error.response.data) {
                dispatch(signInFailure(error.response.data.message));
            }
        });
    }
    return (
        <div className="font-poppins w-full flex justify-center pt-16 h-screen dark:bg-[#212121]">
            <div className="w-[320px] flex flex-col items-center">
                <div>
                    <span className="text-[#344564] font-bold text-2xl dark:text-white">Sign In</span>
                </div>
                {/* Email */}
                <div className="mt-4 w-full">
                    <input type="email" ref={email} placeholder="Email" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
                </div>

                {/* Password */}
                <div className="mt-4 w-full">
                    <input type="password" ref={password} placeholder="Password" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
                </div>

                {/* Button */}
                <div className="mt-6 w-full">
                    <button className="bg-[#344564] px-2 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90"
                        onClick={signInHandler} disabled={loading}>
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </div>

                <OAuth></OAuth>

                <div className="text-sm flex w-full justify-between mt-2 px-2">
                    <span className="dark:text-white">Dont have an account ?</span>
                    <span className="font-semibold text-[#344564]"><Link to="/signup">Sign Up</Link></span>
                </div>

                {
                    error && (
                        <div className="bg-[#730202] text-[#fff] text-sm py-3 px-4 mt-4 w-full rounded-lg ">
                            <span>{error}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Signin