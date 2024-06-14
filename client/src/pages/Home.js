import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import Card from "../components/Card";


const Home = () => {
    const [sellListings, setSellListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [offerListings, setOfferListings] = useState([]);

    useEffect(() => {
        fetchSellListings();
    }, []);

    const fetchSellListings = () => {
        axios.get("/api/listing/get?type=sell&limit=4").then((response) => {
            setSellListings(response.data);
            fetchRentListings();
        })
    };

    const fetchRentListings = () => {
        axios.get("/api/listing/get?type=rent&limit=4").then((response) => {
            setRentListings(response.data);
            fetchOfferListings();
        })
    };

    const fetchOfferListings = () => {
        axios.get("/api/listing/get?type=all&offer=true&limit4").then((response) => {
            setOfferListings(response.data);
        })
    };


    return (
        <div className="font-poppins w-full flex flex-col">
            <div className="w-full relative">
                <img src="./home_bg.jpg" alt="bg" className="w-full object-cover h-[500px] absolute overflow-hidden"></img>

                <div className="sm:px-[10%] px-[5%] absolute top-0 w-full sm:w-3/4 mt-[5%]">
                    <div className="w-full">
                        <span className="font-bold text-3xl sm:text-5xl">Explore Endless Possibilities<br /> with <span className="text-[#A3AEB0]">The Realty</span></span>
                    </div>
                    <div className="mt-4 font-medium text-sm">
                        <span className=" text-gray-400">At The Realty, we understand that finding the perfect property can be overwhelming. That's why we're here to simplify the process for you.
                            Our user-friendly platform ensures a seamless browsing experience, allowing you to explore our extensive listings with ease. From luxurious homes to cozy apartments,
                            commercial spaces to investment opportunities, we've got it all covered.
                        </span>
                    </div>
                    <div className="mt-8 ">
                        <Link to="/search" className="font-semibold text-xl text-[#788C64] hover:opacity-65 transition-all border-b-2">
                            <span className="">Let's start now...</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-[500px] sm:px-[10%] px-[5%] dark:bg-[#212121]">
                <div className="mt-8 w-full">
                    <div className="w-full">
                        {/* Heading */}
                        <div className="mb-3 flex flex-col">
                            <span className="text-xl font-bold dark:text-white">Recent Places for Rent</span>
                            <span className="text-sm font-medium text-[#788C64] hover:opacity-65 transition-all">
                                <Link to="/search?type=rent" className="border-b">Show more places</Link>
                            </span>
                        </div>
                        {/* Cards */}
                        <div className="w-full">
                            {
                                rentListings.length === 0 && (
                                    <div className="mt-1">
                                        <span className="text-sm font-medium text-gray-400">No Listing Found...</span>
                                    </div>
                                )
                            }
                            {
                                rentListings.length > 0 && (
                                    <div className="mt-2 flex flex-wrap sm:flex-nowrap justify-center">
                                        {
                                            rentListings.map((listing, index) => (
                                                <Card listing={listing} key={index}></Card>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full">
                        {/* Heading */}
                        <div className="mb-3 flex flex-col">
                            <span className="text-xl font-bold dark:text-white">Recent Places for Sell</span>
                            <span className="text-sm font-medium text-[#788C64] hover:opacity-65 transition-all">
                                <Link to="/search?type=sell" className="border-b">Show more places</Link>
                            </span>
                        </div>
                        {/* Cards */}
                        <div className="w-full">
                            {
                                sellListings.length === 0 && (
                                    <div className="mt-1">
                                        <span className="text-sm font-medium text-gray-400">No Listing Found...</span>
                                    </div>
                                )
                            }
                            {
                                sellListings.length > 0 && (
                                    <div className="mt-2 flex flex-wrap sm:flex-nowrap justify-center">
                                        {
                                            sellListings.map((listing, index) => (
                                                <Card listing={listing} key={index}></Card>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full">
                        {/* Heading */}
                        <div className="mb-3 flex flex-col">
                            <span className="text-xl font-bold dark:text-white">Recent Offers</span>
                            <span className="text-sm font-medium text-[#788C64] hover:opacity-65 transition-all">
                                <Link to="/search?offer=true" className="border-b">Show more offers</Link>
                            </span>
                        </div>
                        {/* Cards */}
                        <div className="w-full">
                            {
                                offerListings.length === 0 && (
                                    <div className="mt-1">
                                        <span className="text-sm font-medium text-gray-400">No Listing Found...</span>
                                    </div>
                                )
                            }
                            {
                                offerListings.length > 0 && (
                                    <div className="mt-2 flex flex-wrap sm:flex-nowrap justify-center">
                                        {
                                            offerListings.map((listing, index) => (
                                                <Card listing={listing} key={index}></Card>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home