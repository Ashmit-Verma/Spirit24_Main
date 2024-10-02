// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RegistrationSuccess from './page/registrationSuccess';
import Auth from './page/auth.js'
import Form from './page/formPage.js'
import Registration from './page/registration.js'
import Landing from './page/landingPage.js';
import SportRegistration from './page/sportsDetail.js';

// SignupRoute to ensure login is done before accessing signup
const SignupRoute = ({ element: Element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Checks if user is logged in
  const isSignedUp = !!localStorage.getItem('signedUp'); // Checks if user has signed up
  return isAuthenticated ? (
    isSignedUp ? <Navigate to="/registration" /> : <Element />
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Form/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/registered-sports" element={<SportRegistration/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
