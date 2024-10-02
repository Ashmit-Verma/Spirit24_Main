// controllers/sportsRegistrationController.js
import { GoogleUser } from '../models/GoogleUser.js';
import SportRegistration from '../models/sports.js';
import User from '../models/User.js';

export const registerSport = async (req, res) => {
  try {
    // Get the logged-in user from the session
    const { sport, captain, viceCaptain, teamMembers, googleId} = req.body;
    console.log(googleId);
    // Ensure the user has filled personal details
    const googleUser=await GoogleUser.findOne({where:{googleId}});
    if(googleUser)
      console.log("Google user found");
    const user=await User.findOne({ where: { userId: googleUser.id } })
    console.log("HI");
    if (!user) {
      return res.redirect("http://localhost:3000/signup").json({ message: "Please fill in personal details first." });
    }
    console.log("user found");

    // Save sport registration and link to the user
    const registration = await SportRegistration.create({
      sport,
      captainFirstName: captain.firstName,
      captainLastName: captain.lastName,
      captainEmail: captain.email,
      captainContactNumber: captain.contactNumber,
      viceCaptainFirstName: viceCaptain.firstName,
      viceCaptainLastName: viceCaptain.lastName,
      viceCaptainEmail: viceCaptain.email,
      viceCaptainContactNumber: viceCaptain.contactNumber,
      teamMembers: JSON.stringify(teamMembers),// This should be an array of objects
      userId: user.id, // Associate with the User ID
    });

    return res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering sport', error });
  }
};

