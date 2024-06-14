import React from 'react'
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";

const Card = ({ listing }) => {
    return (
        <div className="min-h-[350px] w-full sm:w-[300px] border mb-8 sm:mr-8 shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-lg
        dark:border-[#383838]">
            <Link to={`/listing/${listing._id}`}>
                <div className="">
                    <img src={listing.imageUrls[0]} alt="asd" className="object-cover h-[200px] w-full"></img>
                </div>
                <div className="mt-3 px-3">
                    <div>
                        <p className="truncate text-lg font-semibold dark:text-[#A6B4B4]">{listing.name}</p>
                    </div>
                    <div className="flex items-center mt-1">
                        <div className="mr-[3px]">
                            <MdLocationOn className="text-gray-400 w-4 h-4"></MdLocationOn>
                        </div>
                        <p className="truncate text-xs font-medium text-gray-400 dark:text-[#9B9B9B]">{listing.address}</p>
                    </div>
                    <div className="mt-1">
                        <p className=" text-xs font-medium line-clamp-2 text-gray-400 dark:text-[#9B9B9B]">{listing.description}</p>
                    </div>
                    <div className="mt-1">
                        <span className="font-semibold test-sm dark:text-[#A6B4B4]">
                            {listing.type === "rent" ? "₹ " + listing.regularPrice.toLocaleString("en-IN") + " /Month" : "₹ " + listing.regularPrice.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="mt-2 flex mb-4 text-gray-400">
                        <div className="flex mr-3">
                            <FaBed className="w-4 h-4"></FaBed>
                            <span className="ms-1 font-semibold text-xs">
                                {
                                    listing.bedrooms > 1 ? listing.bedrooms + " Beds" : listing.bedrooms + " Bed"
                                }
                            </span>
                        </div>
                        <div className="flex mr-3">
                            <FaBath className="w-3 h-3"></FaBath>
                            <span className="ms-1 font-semibold text-xs">
                                {
                                    listing.bathrooms > 1 ? listing.bathrooms + " Baths" : listing.bathrooms + " Bath"
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card