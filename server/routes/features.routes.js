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
    toggleLike,
    addquotes,
    addlinks,
    getResources,
    deletequotes,
    deletelinks,
    createJournal,
    getJournal,
    deleteJournal
} from '../controllers/features.controller.js';

const router = express.Router();

//mood
router.post('/mood', authMiddleware, isStudent, setMoodController);

//assessment
router.post('/assessment', authMiddleware, isStudent, submitAssessmentController);

//post
router.post('/create', authMiddleware, isStudent, createPost);
router.get('/all-posts', authMiddleware, isStudent, getAllPosts);
router.post('/like/:postId', authMiddleware, isStudent, toggleLike);
router.post('/report/:postId', authMiddleware, isStudent, reportPost);
router.delete('/:postId', authMiddleware, deletePost);
router.get('/trending', authMiddleware, getTrendingTags);

//resources
router.post('/addquotes', authMiddleware, isStudent, addquotes);
router.post('/addlinks', authMiddleware, isStudent, addlinks);
router.get('/resources', authMiddleware, isStudent, getResources);
router.delete('/deletequotes/:idx', authMiddleware, isStudent, deletequotes);
router.delete('/deletelinks/:idx', authMiddleware, isStudent, deletelinks);

//journal
router.post('/journal', authMiddleware, isStudent, createJournal);
router.get('/journal', authMiddleware, isStudent, getJournal);
router.delete('/journal/:idx', authMiddleware, isStudent, deleteJournal);

export default router;