import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const navigate = useNavigate(); // useHistory hook to programmatically navigate

    const handleGoogleLogin = async () => {
      window.open('http://localhost:4000/auth/google','_self')
      const response = await fetch('http://localhost:4000/auth/google', {
          method: 'GET',
          credentials: 'include', // Include cookies if needed for session management
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Response Data:", data); // Log the received data
          // Store the token (or any other data you need)
          localStorage.setItem('token', data.token); // Adjust based on how you manage tokens
          navigate('/signup'); // Redirect to the signup page after successful login
      } else {
          console.error("Login failed:", response.status, response.statusText);
      }
  };

  const handleFacebookLogin = () => {
    window.open('http://localhost:4000/auth/facebook', '_self'); // Update the URL as needed
  };

  const handleAppleLogin = () => {
    window.open('http://localhost:4000/auth/apple', '_self'); // Update the URL as needed
  };


  const backgroundStyle = {
    backgroundImage: 'url("background.png")', // Replace with your actual image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div className="flex min-h-screen" style={backgroundStyle}>
      <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-3xl h-auto md:h-[600px] md:flex">
        <div className="p-8 md:w-1/2 flex flex-col justify-center h-full">
          <h2 className="text-1xl font-bold mb-1">LOGIN</h2>
          <p className="text-2xl mb-6">Select your preferred mode to Sign in.</p>
          <div className="flex gap-4">
            <button onClick={handleGoogleLogin} className="flex items-center justify-center w-20 h-16 border border-gray-300 rounded-lg hover:bg-gray-100">
            <img
            src="google.jpg"
            alt="Google"
            className="object-contain w-full h-full"
          />
            </button>
            {/* <button onClick={handleFacebookLogin} className="flex items-center justify-center w-20 h-16 border border-gray-300 rounded-lg hover:bg-gray-100">
            <img
            src="facebook.png"
            alt="Facebook"
            className="object-contain w-full h-full"
          /> */}
            {/* </button>
            <button onClick={handleAppleLogin} className="flex items-center justify-center w-20 h-16 border border-gray-300 rounded-lg hover:bg-gray-100">
            <img
            src="apple.png"
            alt="Apple"
            className="object-contain w-full h-full"
          /> */}
            {/* </button> */}
          </div>
        </div>
        <div className="relative md:w-1/2 flex items-center justify-end">
          <img
            src="player.png"
            alt="Athlete jumping"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
