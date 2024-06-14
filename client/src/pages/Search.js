import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc",
    });
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.id === "all" || e.target.id === "sell" || e.target.id === "rent") {
            return setSidebarData({ ...sidebarData, type: e.target.id });
        }

        if (e.target.id === "searchTerm") {
            return setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }

        if (e.target.id === "offer" || e.target.id === "furnished" || e.target.id === "parking") {
            return setSidebarData({ ...sidebarData, [e.target.id]: e.target.checked });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "createdAt";
            const order = e.target.value.split("_")[1] || "desc";
            return setSidebarData({ ...sidebarData, sort, order });
        }
    };

    var searchQuery;
    const submitSearchHandler = () => {
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebarData.searchTerm);
        urlParams.set("type", sidebarData.type);
        urlParams.set("parking", sidebarData.parking);
        urlParams.set("furnished", sidebarData.furnished);
        urlParams.set("offer", sidebarData.offer);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("order", sidebarData.order);
        searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        fetchListings(urlParams.toString());
    }, [window.location.search]);

    const fetchListings = (searchQuery) => {
        axios.get(`/api/listing/get?${searchQuery}`).then((listings) => {
            setListings(listings.data);
            if (listings.data.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }).catch((error) => {
            console.log("error from search component", error);
        })
    };

    const showMoreHandler = () => {
        const numberofListings = listings.length;
        const startIndex = numberofListings;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        axios.get(`/api/listing/get?${searchQuery}`).then((newListings) => {
            setListings([...listings, ...newListings.data]);
            if (newListings.data.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }).catch((error) => {
            console.log("error from search component", error);
        })
    }

    return (
        <div className="font-poppins w-full sm:px-[10%] px-[5%] pt-8 dark:bg-[#212121]">
            <div className="flex flex-col">
                {/* Search */}
                <div className="w-full text-sm font-medium flex flex-wrap border rounded-lg px-6 py-4 shadow-lg">
                    <div className="w-full flex flex-wrap items-center">
                        {/* Search Term */}
                        <div className="flex overflow-auto flex-wrap items-center mb-3 mr-6">
                            <div className="mr-2 text-gray-500">
                                <span>Search Terms: </span>
                            </div>
                            <input type="text" id="searchTerm" placeholder="Search..." value={sidebarData.searchTerm} onChange={handleChange}
                                className="outline-none px-3 py-2 border border-[#DFDFDF] rounded-lg focus:border-[#182625] bg-[#F8F8F8] dark:bg-[#2E2E2E] dark:text-white">
                            </input>
                        </div>

                        {/* Type */}
                        <div className="flex overflow-auto flex-wrap items-center mb-3 mr-6">
                            <div className="mr-4 text-gray-500">
                                <span>Type: </span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="all" checked={sidebarData.type === 'all'} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Rent & Sell</span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="rent" checked={sidebarData.type === 'rent'} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Rent</span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="sell" checked={sidebarData.type === 'sell'} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Sell</span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="offer" checked={sidebarData.offer} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Offer</span>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex overflow-auto flex-wrap items-center mb-3 mr-6">
                            <div className="mr-4 text-gray-500">
                                <span>Amenities: </span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="parking" checked={sidebarData.parking} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Parking Lot</span>
                            </div>
                            <div className="flex mr-4">
                                <input type="checkbox" id="furnished" checked={sidebarData.furnished} onChange={handleChange}></input>
                                <span className="ms-1 dark:text-gray-300">Furnished</span>
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="flex overflow-auto flex-wrap items-center mb-3 mr-6">
                            <div className="mr-4 text-gray-500">
                                <span>Sort: </span>
                            </div>
                            <div className="flex mr-4">
                                <select id="sort_order" className="outline-none cursor-pointer dark:bg-[#2E2E2E] dark:text-white px-2 py-2 border border-[#DFDFDF] rounded-lg" onChange={handleChange} defaultValue={"createdAt_desc"}>
                                    <option value="regularPrice_desc">Price High to Low</option>
                                    <option value="regularPrice_asc">Price Low to High</option>
                                    <option value="createdAt_desc">Latest</option>
                                    <option value="createdAt_asc">Oldest</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Butoon */}
                        <div className="flex overflow-auto flex-wrap items-center w-full border-t-2 pt-3">
                            <button className="bg-[#5D8A66] px-2 py-2 text-white rounded-md hover:opacity-90 disabled:opacity-75 w-full"
                                onClick={submitSearchHandler}>
                                <span className="">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Listing Results */}
                <div className="mt-8 w-full pb-12">
                    <div className="w-full">
                        {/* Heading */}
                        <div className="mb-4">
                            <span className="text-xl font-bold dark:text-white">Listing Results :</span>
                        </div>
                        {/* Cards */}
                        <div className="w-full">
                            {
                                listings.length === 0 && (
                                    <div className="mt-1">
                                        <span className="text-sm font-medium text-gray-400">No Listing Found...</span>
                                    </div>
                                )
                            }
                            {
                                listings.length > 0 && (
                                    <div className="mt-2 flex flex-wrap justify-center">
                                        {
                                            listings.map((listing, index) => (
                                                <Card listing={listing} key={index}></Card>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {
                        showMore && (
                            <div className="w-full flex justify-center mt-4">
                                <div>
                                    <button className="bg-[#344564] px-12 py-3 text-white w-full rounded-lg hover:shadow-2xl hover:opacity-90"
                                        onClick={showMoreHandler}>
                                        Show More
                                    </button>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Search