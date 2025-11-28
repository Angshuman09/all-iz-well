import express from 'express'
import { studentFormController } from '../controllers/student.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isStudent } from '../middleware/roleAuth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, isStudent, studentFormController);

export default router;