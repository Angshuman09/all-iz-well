import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isSuperAdmin } from '../middleware/roleAuth.middleware.js';
import { acceptCollege, getActiveColleges, getInactiveColleges, getRejectedColleges, rejectCollege } from '../controllers/college.controller.js';

const router = express.Router();

router.get('/active', authMiddleware, getActiveColleges);
router.get('/inactive', authMiddleware, getInactiveColleges);
router.get('/rejected', authMiddleware, getRejectedColleges);
router.patch('/accept/:collegeId', authMiddleware, isSuperAdmin, acceptCollege);
router.patch('/reject/:collegeId', authMiddleware, isSuperAdmin, rejectCollege);

export default router;