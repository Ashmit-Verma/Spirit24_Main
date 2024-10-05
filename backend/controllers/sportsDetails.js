import { GoogleUser } from '../models/GoogleUser.js';
import SportRegistration from '../models/sports.js';
import User from '../models/User.js';

export const getSportRegistration = async (req, res) => {
  try {
    // Access googleId from query parameters
    const { googleId } = req.query;
    console.log("sports Detail"+googleId);

    // Find the GoogleUser by googleId
    const googleUser = await GoogleUser.findOne({ where: { googleId } });
    if (!googleUser) {
      return res.status(404).json({ message: "Google user not found" });
    }

    // Find the User associated with the GoogleUser
    const user = await User.findOne({ where: { userId: googleUser.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all sports registrations associated with the user
    const registrations = await SportRegistration.findAll({ where: { userId: user.userId } });
    
    if (registrations.length === 0) {
      return res.status(404).json({ message: "No sports registrations found for this user" });
    }

    // Format the registrations to include team members if they exist
    const formattedRegistrations = registrations.map(registration => {
      return {
        ...registration.get(), // Spread the registration fields
        teamMembers: registration.teamMembers ? JSON.parse(registration.teamMembers) : [], // Parse if teamMembers is a string
      };
    });

    // Return the registrations with user information
    return res.status(200).json({
      googleId,
      registrations: formattedRegistrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error); // Log the error for debugging
    return res.status(500).json({ message: 'Error fetching registrations', error: error.message });
  }
  
};
