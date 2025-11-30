import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/roleAuth.middleware.js';
import { adminFormController } from '../controllers/admin.controller.js';
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/',upload.single('imageFile'), authMiddleware, isAdmin, adminFormController);
export default router;