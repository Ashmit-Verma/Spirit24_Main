import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Define the GoogleUser model
export const GoogleUser = sequelize.define("GoogleUser", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Set id as the primary key
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure that Google IDs are unique
  },
});

// Sync the model with the database
GoogleUser.sync()
  .then(() => console.log("GoogleUser table created"))
  .catch((err) => console.error("Error creating GoogleUser table:", err));
