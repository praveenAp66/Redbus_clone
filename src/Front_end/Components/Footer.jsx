import React from 'react';
import redbusimg from '../../assets/rdc-redbus-logo.webp';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa"

const About = [
    { id: 1, name: "Investor Relations" },
    { id: 2, name: "Contact us" },
    { id: 3, name: "Mobile version" },
    { id: 4, name: "redBus on mobile" },
    { id: 5, name: "Sitemap" },
    { id: 6, name: "Offers" },
    { id: 7, name: "Careers" },
    { id: 8, name: "Values" }
];

const Info = [
    { id: 1, name: "T&C" },
    { id: 2, name: "Privacy policy" },
    { id: 3, name: "FAQ" },
    { id: 4, name: "Blog" },
    { id: 5, name: "Bus operator registration" },
    { id: 6, name: "Agent registration" },
    { id: 7, name: "Insurance partner" },
    { id: 8, name: "User agreement" },
    { id: 9, name: "Primo Bus" },
    { id: 10, name: "Bus Timetable" }
];

const GlobalSites = [
    { id: 1, name: "India" },
    { id: 2, name: "Singapore" },
    { id: 3, name: "Malaysia" },
    { id: 4, name: "Indonesia" },
    { id: 5, name: "Peru" },
    { id: 6, name: "Colombia" },
    { id: 7, name: "Cambodia" },
    { id: 8, name: "Vietnam" }
];

const OurPartners = [
    { id: 1, name: "Goibibo Bus" },
    { id: 2, name: "Goibibo Hotels" },
    { id: 3, name: "Makemytrip Hotels" }
];

const socialicons=[
    { id: 1, name: <FaFacebookF />},
    { id: 1, name: <FaTwitter /> },
    { id: 1, name: <FaLinkedinIn /> },
    { id: 1, name: <FaInstagramSquare />},

]

const Footer = () => {
    return (
        <div className='w-full bg-gray-100 py-10 mt-4 '>
            <div className='max-w-[1200px] mx-auto px-4 '>
                <div className='flex flex-wrap justify-between gap-8'>
                    <div className='flex flex-col w-full sm:w-[250px] items-center'>
                        <img src={redbusimg} alt="redbusimg" className='w-[56px] h-[56px] mb-4' />
                        <p className='text-gray-600'>
                            redBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally. redBus offers bus ticket booking through its website, iOS, and Android mobile apps for all major routes.
                        </p>
                    </div>

                    <ul className='w-full sm:w-auto'>
                        <li className='font-bold mb-2 text-gray-800'>About us</li>
                        {About.map((item) => (
                            <li key={item.id} className='text-gray-600 mb-1 hover:text-gray-900 transition-colors duration-200'>
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <ul className='w-full sm:w-auto'>
                        <li className='font-bold mb-2 text-gray-800'>Info</li>
                        {Info.map((item) => (
                            <li key={item.id} className='text-gray-600 mb-1 hover:text-gray-900 transition-colors duration-200'>
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <ul className='w-full sm:w-auto'>
                        <li className='font-bold mb-2 text-gray-800'>Global Sites</li>
                        {GlobalSites.map((item) => (
                            <li key={item.id} className='text-gray-600 mb-1 hover:text-gray-900 transition-colors duration-200'>
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <ul className='w-full sm:w-auto'>
                        <li className='font-bold mb-2 text-gray-800'>Our Partners</li>
                        {OurPartners.map((item) => (
                            <li key={item.id} className='text-gray-600 mb-1 hover:text-gray-900 transition-colors duration-100'>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='border-t-2 border-gray-300'>
                    <div className='max-w-[1200px] mx-auto px-4 flex justify-between mt-3'>
                        <div>
                            <p>Ⓒ 2024 Redbus India Pvt Ltd. All rights reserved</p>
                        </div>
                        <ul className='flex space-x-4'>
                            {
                                socialicons.map((icons)=>(
                                    <li key={icons.key}>{icons.name}</li>


                                  

                                ))
                            }
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
