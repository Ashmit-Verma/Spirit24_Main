import express from 'express';
import {registerSport}  from '../controllers/sportsRegistrationController.js';

const router = express.Router();

router.post('/', registerSport);

export default router;
