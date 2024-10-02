import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; // Assuming you have the User model

const SportRegistration = sequelize.define(
  "SportRegistration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    captainFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    captainLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    captainEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    captainContactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viceCaptainFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viceCaptainLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viceCaptainEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viceCaptainContactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamMembers: {
      type: DataTypes.STRING, // Changed from JSONB to JSON
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define relationships
SportRegistration.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(SportRegistration, { foreignKey: 'userId' });

export default SportRegistration;
