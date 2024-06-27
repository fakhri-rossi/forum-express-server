import express from 'express';
const router = express.Router();
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// /api/v1/auth

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', authMiddleware, getUser);

export default router;