import express from 'express';
import { addCounsellorController } from '../controllers/counsellor.controller.js';
import { getCollege } from '../middleware/roleAuth.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isAdmin, isCounsellor } from '../middleware/roleAuth.middleware.js';
import { getCounsellorController } from '../controllers/counsellor.controller.js';
import { getCriticalStudents } from '../controllers/counsellor.controller.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, getCollege, addCounsellorController);
router.get('/', authMiddleware, isCounsellor, getCounsellorController);
router.get('/critical-students', authMiddleware, isCounsellor, getCriticalStudents);

export default router;