import express from "express";
import jwt from "jsonwebtoken"; // For token generation
import { GoogleUser } from "../models/GoogleUser.js";
import passport from "../controllers/passport.js";
import User from "../models/User.js"

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'], // Request access to the user's Google profile
  })
);

// Google OAuth callback route
router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    console.log("Entered Google OAuth callback route"); // Step 1: Route hit confirmation

    if (req.user) {
      console.log("User authenticated through Google:", req.user); // Step 2: Log user object

      try {
        // Extract the relevant details from the user's profile
        const { googleId, username } = req.user;
        console.log("Extracted user ID:", googleId, "Username:", username); // Step 3: Log extracted data

        // Check if the user already exists in the database
        let googleUser = await GoogleUser.findOne({ where: { googleId } });
        console.log("GoogleUser found in DB:", googleUser); // Step 4: Log DB lookup result

        if (!googleUser) {
          // If the user does not exist, create a new entry in the database
          console.log("User not found, creating new entry");
          googleUser = await GoogleUser.create({ googleId, username });
          console.log("New GoogleUser created:", googleUser); // Step 5: Log user creation
        } else {
          console.log("User already exists:", googleUser); // Step 6: User already exists
        }

        const userEntry = await User.findOne({ where: { userId: googleUser.id } });

        // Generate a JWT token for the user
        if (userEntry) {
          // If the user entry exists, generate a JWT token
          const token = jwt.sign(
            { id: googleUser.id, googleId: googleUser.googleId, username: googleUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );

          // Send the token to the frontend
          return res.redirect(`https://chipper-hamster-bec1f3.netlify.app/registration?googleId=${googleUser.googleId}`);
        } else {
          // If the user entry does not exist, redirect to the signup page
          console.log("User profile is incomplete, redirecting to signup");
          return res.redirect(`https://chipper-hamster-bec1f3.netlify.app/signup?googleId=${googleUser.googleId}`);  // Replace with your actual signup route
        }

      } catch (error) {
        // Handle any errors that occur during database operations
        console.error("Error saving user to the database:", error); // Step 7: Log database error
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      // If authentication fails, send a failure response
      console.log("Authentication failed: no user returned from Google"); // Step 8: Log failure case
      return res.status(401).json({ message: "Authentication failed" });
    }
  }
);

export default router;
