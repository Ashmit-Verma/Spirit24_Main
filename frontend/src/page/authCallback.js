import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Make sure you have axios installed for HTTP requests

const AuthCallback = () => {
  const location = useLocation();
  const history = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state for showing a loading indicator

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    console.log("Token received:", token);
 // Extract the token from the query string

    if (token) {
      // Store token in localStorage for authentication
      localStorage.setItem('authToken', token);

      // Set default headers for axios with the token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


      // Make an API call to check if the user profile data is complete
      const checkUserData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/profile"); // Adjust this endpoint
          console.log("Profile response:", response.data);

          if (response.data.isComplete) {
            // If the user has already filled the required data, redirect to dashboard
            history('/registration');
          } else {
            // If the user has not filled the required data, redirect to a profile completion form
            history('/signup'); // Replace this with your form route
          }
        } catch (error) {
          console.error("Error checking user data:", error);
          history('/login'); // Redirect to login in case of any errors
        } finally {
          setLoading(false); // Set loading to false once the request is done
        }
      };

      checkUserData();
    } else {
      history('/login'); // If no token is found, redirect to login
    }
  }, [location, history]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  return null; // No UI is rendered once the user is redirected
};

export default AuthCallback;