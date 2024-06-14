import React, { useRef, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.js";

const Signup = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUpHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post("/api/auth/signup", {
            email: email.current.value,
            username: username.current.value,
            password: password.current.value
        }).then((response) => {
            setLoading(false);
            setError(null);
            navigate("/signin");
        }).catch((error) => {
            setLoading(false);
            if (error && error.response && error.response.data) {
                setError(error.response.data.message)
            }
        });
    }
    return (
        <div className="font-poppins w-full flex justify-center pt-16 h-screen dark:bg-[#212121]">
            <div className="w-[320px] flex flex-col items-center">
                <div>
                    <span className="text-[#344564] font-bold text-2xl dark:text-white">Sign Up</span>
                </div>

                {/* Username */}
                <div className="mt-6 w-full">
                    <input type="text" ref={username} placeholder="Username" className="w-full outline-none px-4 py-3 border rounded-lg focus:border-[#182625] bg-[#F8F8F8]"></input>
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
                        onClick={signUpHandler} disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </div>

                <OAuth></OAuth>

                <div className="text-sm flex w-full justify-between mt-2 px-2">
                    <span className="dark:text-white">Already have an account ?</span>
                    <span className="font-semibold text-[#344564]"><Link to="/signin">Sign in</Link></span>
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

export default Signup