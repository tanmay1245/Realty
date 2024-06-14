import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import Theme from "./Theme";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.user);

    useEffect(() => {
        const timer = setTimeout(() => {
            getSeachSuggestions();
        }, 200);

        return () => {
            clearTimeout(timer);
        }
    }, [searchTerm]);

    const getSeachSuggestions = () => {
        if (searchTerm) {
            axios.get(`/api/listing/getsearchsuggestions?searchTerm=${searchTerm}`).then((response) => {
                setSearchSuggestions(response.data);
            });
        } else {
            setSearchSuggestions([]);
        }
    };

    const searchHandler = (e) => {
        e.preventDefault();
        axios.get(`/api/listing/get?searchTerm=${searchTerm}`).then((listings) => {
            navigate(`/search?searchTerm=${searchTerm}`);
            setSearchSuggestions([]);
        }).catch((error) => {
            console.log("error in header search", error)
        });
    };

    return (
        <header className="flex items-center w-full font-poppins border-b dark:border-[#383838] dark:bg-[#212121]">
            <div className="w-full sm:px-[10%] px-[5%] py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center">
                        {
                            theme === "light" ?
                                <img src="./logo_black.png" className="w-8 sm:w-12 mr-2" alt="logo"></img> :
                                <img src="./logo_white.png" className="w-8 sm:w-12 mr-2" alt="logo"></img>
                        }
                        <span className="font-oswald text-xl font-bold tracking-wider mr-1 text-[#A3AEB0]">The</span>
                        <span className="font-oswald text-xl font-bold tracking-wider dark:text-white">Realty</span>
                    </div>
                </Link>

                {/* Search Bar */}
                <form onSubmit={searchHandler}>
                    <div className="relative">
                        <input type="text" className="text-base outline-none rounded-full px-5 py-2 w-32 sm:w-44 md:w-72 border focus:border-[#ccc] dark:bg-[#2E2E2E]
                        dark:text-white"
                            placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} >
                        </input>
                        <FaSearch className="absolute right-4 top-3 opacity-60 cursor-pointer dark:text-white" onClick={searchHandler} />
                        {
                            searchSuggestions.length > 0 && (
                                <div className="absolute w-full z-50 px-3 py-2 bg-white rounded-2xl shadow-md dark:bg-[#2E2E2E] dark:text-white">
                                    {
                                        searchSuggestions.map((listing, index) => (
                                            <div className="cursor-pointer border-b py-2 hover:bg-[#DEDBCE] dark:hover:bg-[#3C3C3C] px-2" key={index}
                                                onClick={() => {
                                                    navigate(`/listing/${listing._id}`);
                                                    setSearchSuggestions([]);
                                                }}>
                                                <span className=" text-sm">{listing.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                </form>


                {/* Buttons */}
                <div className="flex dark:text-white">
                    <Theme />
                    <div className="hidden sm:flex sm:items-center">
                        <Link to="/" className="mr-6 text-base font-medium hover:text-[#344564]">Home</Link>
                        <Link to="/about" className="text-base mr-6 font-medium hover:text-[#344564]">About</Link>
                        <Link to="/profile" className="text-base font-medium hover:text-[#344564]">
                            {
                                currentUser ? <img alt="profile" src={currentUser.avatar} className="w-8 rounded-full object-cover" /> :
                                    <span className="text-base font-medium hover:text-[#344564]">Sign In</span>
                            }
                        </Link>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header