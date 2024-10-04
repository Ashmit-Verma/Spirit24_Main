import React from "react";
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer=()=>{
    return(
        <footer className="bg-[#FF891B] text-white h-96 p-10 pr-12  md:pl-3 pt-10 p-6">
      <div className="container pl-10">
        <div className="flex justify-between  items-start md: mb-6">
            <div className="flex-col gap-10">

          <img src="logo.png" alt="Logo" className="h-8 w-auto" />
          <p className="text-sm mb-2 md:mb-0">
            The Annual Sports Fest of IIT Guwahati
          </p>
          <p className="text-sm mt-5 pt-20">
            Copyright © 2024 Spirit, Sports Board, IIT Guwahati<br />
            All rights reserved
          </p>
            </div>
        <div className="flex-col h-10">
            <h1 className="text-white text-4xl">Quick Links</h1>
            <p className="text-sm mb-2 pt-8">
            Home
          </p>
          <p className="text-sm mb-2 pt-2">
            Campus Ambassador
          </p>
          <p className="text-sm mb-2 pt-2">
            About Us
          </p>
        </div>
        <div className="flex-col h-10">
            <h1 className="text-white text-4xl">Contact</h1>
            <p className="text-sm mb-2 pt-8">
              Yuvraj Singh - +91 7300505333
            </p>
            <p className="text-sm mb-2 pt-2">
              Harshita Rayi - +91 6305582565
            </p>
        </div>
        </div>
        <div className="flex space-x-4 pt-20">
          <a href="https://www.instagram.com/spirit_iitguwahati/" className="hover:text-gray-200">
            <Instagram size={24} />
          </a>
          <a href="https://www.facebook.com/spiritiitg?sfnsn=wiwspwa&mibextid=RUbZ1f" className="hover:text-gray-200">
            <Facebook size={24} />
          </a>
          <a href="https://www.youtube.com/@spiritiitguwahati2541" className="hover:text-gray-200">
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
    )
}

export default Footer;