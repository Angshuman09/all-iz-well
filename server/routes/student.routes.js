import express from 'express'
import { getStudentData, studentFormController } from '../controllers/student.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isStudent } from '../middleware/roleAuth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, isStudent, studentFormController);
router.get('/', authMiddleware, isStudent, getStudentData);

export default router;