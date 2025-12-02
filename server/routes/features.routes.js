import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { isStudent } from '../middleware/roleAuth.middleware.js';
import {
    createPost,
    deletePost,
    getAllPosts,
    getTrendingTags,
    reportPost,
    setMoodController,
    submitAssessmentController,
    toggleLike
} from '../controllers/features.controller.js';

const router = express.Router();

router.post('/mood', authMiddleware, isStudent, setMoodController);
router.post('/assessment', authMiddleware, isStudent, submitAssessmentController);
router.post('/create', authMiddleware, isStudent, createPost);
router.get('/all-posts', authMiddleware, isStudent, getAllPosts);
router.post('/like/:postId', authMiddleware, isStudent, toggleLike);
router.post('/report/:postId', authMiddleware, isStudent, reportPost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/trending', authMiddleware, getTrendingTags);
export default router;