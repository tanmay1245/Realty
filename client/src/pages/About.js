import React from 'react'

const About = () => {
    return (
        <div className="font-poppins w-full sm:px-[10%] px-[5%] pt-8 dark:bg-[#212121] h-screen overflow-auto">
            <div>
                <div className="text-2xl font-semibold dark:text-white">
                    About <span className="text-[#A3AEB0]">The Realty</span>
                </div>
                <div className="mt-5">
                    <div className="text-md font-medium text-gray-500 dark:text-[#9B9B9B]">
                        Welcome to The Realty, your premier destination for all things real estate. At The Realty, we understand that finding
                        the perfect property can be a daunting task, whether you're searching for your dream home or looking to sell or rent out your property.
                        That's why we're here to make the process as seamless and enjoyable as possible.
                    </div>

                    <div className="text-md font-medium mt-4 text-gray-500 dark:text-[#9B9B9B]">
                        <span className="text-black font-semibold dark:text-white">Property Search:</span> Our advanced search tools make it easy to find properties that match your specific criteria.
                        Whether you're looking for a cozy apartment in the city, a spacious family home in the suburbs, or a commercial space for your business, we have you covered.
                    </div>

                    <div className="text-md font-medium mt-4 text-gray-500 dark:text-[#9B9B9B]">
                        <span className="text-black font-semibold dark:text-white">Listing Services:</span> If you're looking to sell or rent out your property, we offer comprehensive listing services to help
                        you showcase your property to potential buyers or tenants. Our team will work closely with you to create eye-catching listings that highlight
                        the best features of your property and attract the right audience.
                    </div>

                    <div className="text-md font-medium mt-4 text-gray-500 dark:text-[#9B9B9B]">
                        <span className="text-black font-semibold dark:text-white">Market Insights:</span> Stay informed about the latest trends and developments in the real estate market with our
                        comprehensive market insights. Whether you're curious about property values in your area or want to know the best time to buy or sell,
                        our team is here to provide you with the information you need to make informed decisions.
                    </div>

                    <div className="text-md font-medium mt-4 text-gray-500 dark:text-[#9B9B9B]">
                        Whether you're buying, selling, or renting, The Realty is here to help you every step of the way. Contact us today to learn more about how we can
                        assist you with all of your real estate needs.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About