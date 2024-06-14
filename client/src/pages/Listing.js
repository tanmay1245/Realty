import React, { useState } from 'react'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.js"

const Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);

    useEffect(() => {
        axios.get(`/api/listing/get/${id}`).then((listing) => {
            setListing(listing.data);
            adjustImages();
        }).catch((error) => {
            console.log("Error", error)
        })
    }, [id]);

    const adjustImages = () => {
        var container = document.getElementById("container");

        const screenWidth = window.screen.availWidth - 8;
        var nextBtn = document.getElementById("next");
        nextBtn.addEventListener("click", () => {
            container.scrollBy({
                top: 0,
                left: +screenWidth,
                behavior: 'smooth'
            })
        });
        var prevBtn = document.getElementById("prev");
        prevBtn.addEventListener("click", () => {
            container.scrollBy({
                top: 0,
                left: -screenWidth,
                behavior: 'smooth'
            })
        });
    };

    return (
        <div className="font-poppins w-full pb-12 dark:bg-[#212121]">
            {/* Slider */}
            <div className="relative">
                {/* Div for linear gradient */}
                {/* <div className="absolute left-0 h-full w-full bg-gradient-to-r from-[#000C] via-[#0000] to-[#000C]"></div> */}
                <div className="absolute left-0 h-full w-1/4 bg-gradient-to-r from-[#000C] "></div>
                <div className="absolute right-0 h-full w-1/4 bg-gradient-to-l from-[#000C] "></div>
                {/* Prev button */}
                <button id="prev" className="absolute top-[210px] lg:top-[250px] z-10 ms-8 ">
                    <MdNavigateBefore className="w-16 h-16 text-white hover:opacity-75"></MdNavigateBefore>
                </button>
                {/* Image */}
                <div className="">
                    <div className="w-full flex overflow-x-auto" id="container">
                        {
                            listing.imageUrls && listing.imageUrls.map((img, index) => (
                                <img src={img} alt="img" className="h-[450px] lg:h-[550px] min-w-full object-cover" key={index}></img>
                            ))
                        }
                    </div>
                </div>
                {/* Next button */}
                <button id="next" className="absolute top-[210px] lg:top-[250px] right-0 mr-8">
                    <MdNavigateNext className="w-16 h-16 text-white hover:opacity-75"></MdNavigateNext>
                </button>
            </div>

            {/* Main Body */}
            <div className="sm:px-[10%] px-[5%]">
                {/* Name */}
                <div className="pt-8">
                    <span className="font-bold text-2xl dark:text-[#A6B4B4]">{listing.name}</span>
                    <div className="flex items-center text-gray-500 mt-1">
                        <MdLocationOn className=""></MdLocationOn>
                        <span className="ms-1 text-sm font-semibold dark:text-[#9B9B9B]">{listing.address}</span>
                    </div>
                </div>
                {/* Rent or Sell */}
                <div className="mt-4 flex">
                    <div className="text-white px-12 py-2 rounded-lg bg-[#BF0426] disabled  flex items-center justify-center">
                        <span className="font-semibold test-sm">
                            {listing.type === "rent" ? "For Rent" : "For Sell"}
                        </span>
                    </div>
                    <div className="text-white px-12 py-2 rounded-lg bg-[#788C64] disabled flex items-center justify-center ms-6">
                        <span className="font-semibold test-sm">
                            {listing.type === "rent" ? "₹ " + listing.regularPrice + " /Month" : "₹ " + listing.regularPrice}
                        </span>
                    </div>
                </div>
                {/* Description */}
                <div className="mt-4 w-full sm:w-1/2">
                    <span className="font-bold dark:text-[#A6B4B4]">Description </span>
                    <span className="font-medium text-gray-500 dark:text-[#9B9B9B]">{listing.description}</span>
                </div>
                {/* Amenities */}
                <div className="mt-6 flex flex-wrap">
                    <div className="flex text-[#012840] mr-6 dark:text-gray-300">
                        <FaBed className="w-6 h-6"></FaBed>
                        <span className="ms-2 font-semibold">
                            {
                                listing.bedrooms > 1 ? listing.bedrooms + " Beds" : listing.bedrooms + " Bed"
                            }
                        </span>
                    </div>
                    <div className="flex text-[#012840] mr-6 dark:text-gray-300">
                        <FaBath className="w-5 h-5"></FaBath>
                        <span className="ms-2 font-semibold">
                            {
                                listing.bathrooms > 1 ? listing.bathrooms + " Baths" : listing.bathrooms + " Bath"
                            }
                        </span>
                    </div>
                    <div className="flex text-[#012840] mr-6 dark:text-gray-300">
                        <FaParking className="w-5 h-5"></FaParking>
                        <span className="ms-2 font-semibold">
                            {
                                listing.parking ? "Parking Spot" : "No Parking"
                            }
                        </span>
                    </div>
                    <div className="flex text-[#012840] dark:text-gray-300">
                        <MdChair className="w-5 h-5"></MdChair>
                        <span className="ms-2 font-semibold">
                            {
                                listing.furnished ? "Furnished" : "Unfurnished"
                            }
                        </span>
                    </div>
                </div>
                {/* Contact */}
                {
                    currentUser && listing.userRef !== currentUser._id && !contact && (
                        <div className="mt-8 flex justify-center">
                            <div className="w-3/4">
                                <button className="text-white bg-[#212B3D] py-3 w-full rounded-lg hover:opacity-90"
                                    onClick={() => setContact(true)}>
                                    <div className="flex items-center justify-center">
                                        <MdEmail className="mr-2"></MdEmail>
                                        <span className="font-medium">Contact Landlord</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )
                }
                {
                    contact && <Contact listing={listing} />
                }

            </div>
        </div>
    )
}

export default Listing