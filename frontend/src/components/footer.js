import React from "react";
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer=()=>{
    return(
        <footer className="bg-[#FF891B] text-white  p-6 pr-12 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between  items-start md:items-center mb-6">
            <div className="flex-col gap-10">

          <img src="logo.png" alt="Logo" className="h-8 w-auto" />
          <p className="text-sm mb-2 md:mb-0">
            The Annual Sports Fest of IIT Guwahati
          </p>
          <p className="text-sm mt-5">
            Copyright © 2024 Spirit, Sports Board, IIT Guwahati<br />
            All rights reserved
          </p>
            </div>
        <div className="flex justify-start items-start">
            <h1 className="text-white text-4xl">Contact</h1>
        </div>
        </div>
        <div className="flex justify-center space-x-4">
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