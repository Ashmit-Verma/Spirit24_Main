import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { GoogleUser } from "./GoogleUser.js"; // Ensure GoogleUser model is imported

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Define primary key for the User model
    },
    // Foreign key referencing GoogleUser
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GoogleUser, // This references the GoogleUser model
        key: "id", // Use id from GoogleUser as the foreign key
      },
    },
    // General details
    Institute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    participate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Personal details
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternate_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // College details
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

// Sync the model with the database
User.sync()
  .then(() => console.log("User table created"))
  .catch((err) => console.error("Error creating User table:", err));

export default User;
