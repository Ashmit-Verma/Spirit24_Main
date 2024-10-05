import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import { User } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, className }) => {
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const Navigate=useNavigate();
  const [googleId, setGoogleId] = useState('');

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      googleId: params.get("googleId"),
    };
  };

  useEffect(() => {
    const { googleId } = getQueryParams();
    if (googleId) {
      setGoogleId(googleId);
      console.log(googleId);
    }
    else
    {
      Navigate("/login");
    }
  }, [location]);

  useEffect(() => {
    const fetchUserData = async () => {
      if(!googleId) return;
      try {
        const response = await axios.get('https://spirit24-main.onrender.com/profile', {
          params: {
            googleId:  googleId ,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Navigate("/login");
      }
    };

    fetchUserData();
  }, [googleId]);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen flex flex-col bg-white text-black border-r-2 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64 md:h-auto md:flex md:flex-col md:space-y-4 ${className}`}
    >
      <div className="flex items-center justify-center mb-8 p-4">
  <img src="Spirit.png" alt="Spirit logo" className="w-20 h-auto" />
</div>


      <div className="flex flex-col w-full">
        <a href="#dashboard" className="py-4 text-center block bg-black text-white">
          Dashboard
        </a>
        <a href="/" className="py-4 text-center block hover:bg-orange-500 md:bg-transparent text-black">
          Home
        </a>
        <a 
  href={`/registered-sports?googleId=${googleId}`} 
  className="py-4 text-center block hover:bg-orange-500 md:bg-transparent text-black"
>
  Registered Sports
</a>

        <a href={`/registration?googleId=${googleId}`} className="py-4 text-center block hover:bg-orange-500 md:bg-transparent text-black">
          Add Sports
        </a>
        <a 
  href={`/rule?googleId=${googleId}`} 
  className="py-4 text-center block hover:bg-orange-500 md:bg-transparent text-black" 
>
  Rule Book
</a>

        <a href="/" className="py-4 text-center block hover:bg-orange-500 md:bg-transparent text-black">
          Sign Out
        </a>
      </div>
      <div className="mt-auto p-4 flex items-center space-x-2">
      {userData ? (
        <div className="mt-auto flex p-4 items-center space-x-2">
          <User className="text-black" size={20} />
          <div>
            <p className="font-semibold text-black">{userData.name}</p>
            <p className="text-sm text-black">{userData.role || "Player"}</p>
          </div>
        </div>
      ) : (
        <div className="mt-auto flex p-4 items-center space-x-2">
          <p>Loading user details...</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Sidebar;
