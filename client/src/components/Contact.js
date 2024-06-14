import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = (props) => {
    const { listing } = props;
    const [landlord, setLandlord] = useState();
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`/api/user/${listing.userRef}`).then((user) => {
            setLandlord(user.data);
        }).catch((error) => {
            console.log("error in contact", error)
        })
    }, [listing.userRef])

    return (
        <>
            {
                landlord && (
                    <div className="">
                        <div className="mt-5 text-md font-medium text-gray-500 dark:text-gray-300">
                            <div>Contact <span className="font-semibold text-black dark:text-[#9B9B9B]">{landlord.username}</span> for <span className="font-semibold text-black dark:text-[#9B9B9B]">{listing.name}</span></div>
                        </div>
                        <div className="mt-1">
                            <textarea id="message" rows="2" value={message} onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your message here" className="w-full focus:outline-[#212B3D] py-2 px-4 bg-gray-200 rounded-lg text-sm overflow-auto dark:bg-[#2E2E2E] dark:text-white">
                            </textarea>
                        </div>
                        <div className="mt-1 w-full">
                            <Link to={`mailto:${landlord.email}?subject=Regardding ${listing.name}&body=${message}`} target="_blank"
                                className="w-full flex text-white bg-[#212B3D] py-3 rounded-lg hover:opacity-90 justify-center">
                                <span className="font-medium">Send Message</span>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Contact