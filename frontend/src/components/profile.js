    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import { useLocation,useNavigate } from "react-router-dom";
    import { User } from 'lucide-react';

    const ProfilePage = () => {
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
            // const response = await axios.get('https://spirit24-main.onrender.com/profile', {
            //   params: {
            //     googleId:  googleId ,
            //   },
            // });
            const response = await axios.get('http://localhost:8001/profile', {
                params: {
                googleId:  googleId ,
                },
            });
            console.log(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            // Navigate("/login");
        }
        };

        fetchUserData();
    }, [googleId]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="w-full bg-black py-4 flex justify-center items-center">
            <img src="Spirit.svg" alt="Logo"></img>
        </div>
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-8 md:p-16 mt-10 w-11/12 md:w-2/3 lg:w-1/2">
            {/* Profile Image */}
            <div className="w-32 h-32 flex justify-center items-center rounded-full overflow-hidden border-4 border-orange-500 mb-4 md:mb-0">
            <User className="text-black" size={80} />
            </div>

            {/* Profile Info */}
            <div className="md:ml-8 flex flex-col text-center md:text-left">
            <h2 className="text-2xl font-semibold">Profile</h2>

            {/* Name */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">Name*</label>
                <p className="text-lg font-medium">{userData ? userData.name : 'Loading...'}</p>
            </div>

            {/* Email and Phone */}
            <div className="flex flex-col md:flex-row mt-4 md:space-x-8">
                <div>
                <label className="block text-sm font-medium text-gray-600">Email*</label>
                <p className="text-lg font-medium">{userData ? userData.email : 'Loading...'}</p>
                </div>
                <div className="mt-4 md:mt-0">
                <label className="block text-sm font-medium text-gray-600">Phone No. (WhatsApp)</label>
                <p className="text-lg font-medium">{userData ? userData.mobile : 'Loading...'}</p>
                </div>
            </div>

            {/* Gender */}
            <div className="mt-4">
  <label className="block text-sm font-medium text-gray-600">Gender</label>
  <div className="inline-flex items-center bg-gray-100 p-2 rounded-lg">
    {userData ? (
      userData.gender === "male" ? (
        <>
          <span className="text-xl">♂</span>
          <span className="ml-2 text-lg">Male</span>
        </>
      ) : (
        <>
          <span className="text-xl">♀</span>
          <span className="ml-2 text-lg">Female</span>
        </>
      )
    ) : (
      'Loading...'
    )}
  </div>
</div>


            {/* Buttons */}
            <div className="flex mt-6 space-x-4 justify-center md:justify-start">
                <button className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg">
                <span className="mr-2">←</span> Back
                </button>
                <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg">
                <span className="mr-2">✏️</span> Edit Profile
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default ProfilePage;
