import express from 'express';
import {profileController} from "../controllers/profile.js" // Your User model

const router = express.Router();

// Profile completion check route
router.get('/',profileController);

export default router;