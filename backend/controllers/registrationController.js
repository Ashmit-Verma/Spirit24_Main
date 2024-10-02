import User from '../models/User.js';
import { GoogleUser } from '../models/GoogleUser.js'; // GoogleUser model

// Controller to handle personal details form submission
export const registerUser = async (req, res) => {
  try {
    const { 
      instituteName,
      streetName,
      pincode,
      city,
      state,
      year,
      name,
      email,
      mobile,
      alternate_no,
      gender,
      participation,
      googleId,
    } = req.body;


    if (!googleId) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Check if the user already filled personal details
    const googleUser= await GoogleUser.findOne({where:{googleId}});
    
    if(googleUser)
    {
      const existingUser = await User.findOne({ where: { userId: googleUser.id } });

      if (existingUser) {
        return res.status(400).json({ message: "Personal details already submitted." });
      }
      else
      {

        const user = await User.create({
          name,
          email,
          mobile,
          alternate_no,
          gender,
          Institute: instituteName,
          Street: streetName,
          pincode,
          City: city,
          State: state,
          year,
          participate: participation,
          userId:googleUser.id, // Link Google user
        });
    
        return res.status(201).json({ message: "Registration successful!" });
      }
    }
    
    // Save user details and associate with the Google user
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
