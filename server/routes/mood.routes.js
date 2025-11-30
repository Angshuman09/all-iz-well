import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isStudent } from '../middleware/roleAuth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, isStudent, )
export default router;