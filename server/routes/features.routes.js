import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isStudent } from '../middleware/roleAuth.middleware.js';
import { setMoodController } from '../controllers/mood.controller.js';

const router = express.Router();

router.post('/mood', authMiddleware, isStudent, setMoodController);
export default router;