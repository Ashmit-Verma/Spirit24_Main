// controllers/sportsRegistrationController.js
import { GoogleUser } from '../models/GoogleUser.js';
import SportRegistration from '../models/sports.js';
import User from '../models/User.js';
import validator from 'validator'; // Make sure to install the validator package

export const registerSport = async (req, res) => {
  try {
    // Get the logged-in user from the session
    const { sport, captain, viceCaptain, teamMembers, googleId } = req.body;
    
    // Validate incoming data
    const errors = [];
    
    // Check if sport is provided
    if (!sport) {
      errors.push("Sport is required.");
    }

    // Validate captain's details
    if (!captain || !captain.firstName || !captain.lastName || !captain.email || !captain.contactNumber) {
      errors.push("All captain's details are required.");
    } else {
      // Validate captain's email
      if (!validator.isEmail(captain.email)) {
        errors.push("Captain's email is invalid.");
      }
      // Validate captain's contact number (assuming it should be 10 digits)
      if (!/^\d{10}$/.test(captain.contactNumber)) {
        errors.push("Captain's contact number must be 10 digits.");
      }
    }

    // Validate vice-captain's details
    if (!viceCaptain || !viceCaptain.firstName || !viceCaptain.lastName || !viceCaptain.email || !viceCaptain.contactNumber) {
      errors.push("All vice-captain's details are required.");
    } else {
      // Validate vice-captain's email
      if (!validator.isEmail(viceCaptain.email)) {
        errors.push("Vice-captain's email is invalid.");
      }
      // Validate vice-captain's contact number (assuming it should be 10 digits)
      if (!/^\d{10}$/.test(viceCaptain.contactNumber)) {
        errors.push("Vice-captain's contact number must be 10 digits.");
      }
    }

    // Validate team members
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      errors.push("At least one team member is required.");
    } else {
      teamMembers.forEach((member, index) => {
        if (!member.firstName || !member.lastName || !member.email || !member.contactNumber) {
          errors.push(`All details for team member ${index + 1} are required.`);
        } else {
          // Validate team member's email
          if (!validator.isEmail(member.email)) {
            errors.push(`Email for team member ${index + 1} is invalid.`);
          }
          // Validate team member's contact number (assuming it should be 10 digits)
          if (!/^\d{10}$/.test(member.contactNumber)) {
            errors.push(`Contact number for team member ${index + 1} must be 10 digits.`);
          }
        }
      });
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation errors", errors });
    }

    // If validation passes, proceed with fetching the Google user
    const googleUser = await GoogleUser.findOne({ where: { googleId } });
    if (!googleUser) {
      return res.status(404).json({ message: "Google user not found." });
    }

    const user = await User.findOne({ where: { userId: googleUser.id } });
    if (!user) {
      return res.redirect("https://spiritiitg.in/signup").json({ message: "Please fill in personal details first." });
    }

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
      teamMembers, // This should be an array of objects
      userId: user.userId, // Associate with the User ID
    });

    return res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    console.error('Error in registration:', error); 
    return res.status(500).json({ message: 'Error registering sport', error });
  }
};
