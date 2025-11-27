import express from 'express';
import { registerController, loginController, logoutController, verifyOtpController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getData } from '../controllers/getUser.controller.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/get-data', authMiddleware, getData);
router.post('/verify-otp', verifyOtpController);

export default router;