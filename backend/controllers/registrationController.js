import User from '../models/User.js';
import { GoogleUser } from '../models/GoogleUser.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

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
      position,
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
          position:position,
          userId:googleUser.id, // Link Google user
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'Registration successful ',
          text: `Dear ${name} , 

          We have successfully received your registration for SPIRIT 2024 , scheduled from October 24th to 27th which is to be held at IIT Guwahati. Now you have to just wait for the Pr team of Spirit’2024 to contact you regarding the payment of Registration fee for the respective sports where a google form will be circulated , following which another mail will be received confirming your spot for Spirit’2024 . 

          For any further queries or feedback, please feel free to mail us at:publicrelation.spirit@gmail.com

          For more information and updates, please visit our social media
          channels:

          Instagram: https://instagram.com/ spirit_litguwahati?
          igshid=YmMyMTA2M2Y=

          Facebook Page: https:// www.facebook.com/spiritiitg

          Thanks and Regards

          Harshitha Rayi
          Public Relations Head, Spirit'24
          Contact: 6305582565

          Yuvraj Singh
          Public Relations Head, Spirit'24
          Contact: 7300505333`,
        };
        await transporter.sendMail(mailOptions);
    
        return res.status(201).json({ message: "Registration successful!" });
      }
    }
    
    // Save user details and associate with the Google user
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
