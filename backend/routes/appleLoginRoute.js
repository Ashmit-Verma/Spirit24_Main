import express from "express";

import passport from "../controllers/passportApple.js";

const router=express.Router();

router.get('/auth/apple', passport.authenticate('apple', {
    scope: ['profile'], // Request access to the user's Google profile (adjust as needed)
  }));
  
  // Google OAuth callback route
  router.get('/auth/apple/redirect',
    passport.authenticate('apple', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect to the desired page
      if (req.user) {
        // Send success response with status code and message
        return res.status(200).json({ message: "Authentication successful", user: req.user });
      } else {
        // Send failure response with status code and message
        return res.status(401).json({ message: "Authentication failed" });
      }
    }
  );
  
  export default router;
   