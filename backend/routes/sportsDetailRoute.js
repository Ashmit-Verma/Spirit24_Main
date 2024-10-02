import express from 'express';
import {getSportRegistration} from '../controllers/sportsDetails.js';

const router = express.Router();

router.get('/', getSportRegistration);

export default router;