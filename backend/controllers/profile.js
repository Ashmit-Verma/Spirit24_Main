import express from 'express';
import  User from '../models/User.js';
import { GoogleUser } from '../models/GoogleUser.js'; // Your User model



// Profile completion check route
export const profileController= async (req, res) => {
    const { googleId } = req.query;
    console.log(googleId);

    try {
      // Find the user in the database based on googleId
      const googleuser = await GoogleUser.findOne({ where: { googleId } });
      const user=await User.findOne({ where: { userId: googleuser.id } })
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send user data as a response
      res.json({
        name: user.name,
        avatarUrl: user.avatarUrl, // Assuming the user has an avatar URL stored
        role: user.participate, // Send the role or default to "Player"
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Server error" });
    }
};
