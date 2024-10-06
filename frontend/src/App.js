// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import RegistrationSuccess from './page/registrationSuccess';
import Auth from './page/auth.js'
import Form from './page/formPage.js'
import Registration from './page/registration.js'
import Landing from './page/landingPage.js';
import SportRegistration from './page/sportsDetail.js';
import Rule from './page/rulePage.js';
import Profile from './page/profilePage.js';


// SignupRoute to ensure login is done before accessing signup


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Form/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/registered-sports" element={<SportRegistration/>} />
        <Route path="/rule" element={<Rule/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
