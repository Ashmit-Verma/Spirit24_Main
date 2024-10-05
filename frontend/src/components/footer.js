import React from "react";
import { Instagram, Facebook, Youtube,Linkedin} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#FF891B] text-white h-auto p-10 md:p-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div className="flex flex-col gap-5 md:gap-10 mb-8 md:mb-0">
                        <img src="logo.png" alt="Logo" className="h-8 w-auto" />
                        <p className="text-sm">
                            The Annual Sports Fest of IIT Guwahati
                        </p>
                        <p className="text-sm mt-5">
                            Copyright © 2024 Spirit, Sports Board, IIT Guwahati<br />
                            All rights reserved
                        </p>
                    </div>
                    <div className="flex flex-col h-auto mb-8 md:mb-0">
                        <h1 className="text-white text-2xl md:text-4xl">Quick Links</h1>
                        <p className="text-sm mb-2 pt-2">Home</p>
                        <p className="text-sm mb-2 pt-2">Campus Ambassador</p>
                        <p className="text-sm mb-2 pt-2">About Us</p>
                    </div>
                    <div className="flex flex-col h-auto mb-8 md:mb-0">
                        <h1 className="text-white text-2xl md:text-4xl">Contact</h1>
                        <p className="text-sm mb-2 pt-2">Yuvraj Singh - +91 7300505333</p>
                        <p className="text-sm mb-2 pt-2">Harshita Rayi - +91 6305582565</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                    <a href="https://www.instagram.com/spirit_iitguwahati/" className="hover:text-gray-200">
                        <Instagram size={24} />
                    </a>
                    <a href="https://www.facebook.com/spiritiitg?sfnsn=wiwspwa&mibextid=RUbZ1f" className="hover:text-gray-200">
                        <Facebook size={24} />
                    </a>
                    <a href="https://www.youtube.com/@spiritiitguwahati2541" className="hover:text-gray-200">
                        <Youtube size={24} />
                    </a>
                    <a href="https://www.linkedin.com/company/spiritiitguwahati/posts/?feedView=all" className="hover:text-gray-200">
                        <Linkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
