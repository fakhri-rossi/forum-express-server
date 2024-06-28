import express from 'express';
const router = express.Router();
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { authMiddleware, permissionUser } from '../middleware/authMiddleware.js';

// /api/v1/auth

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', authMiddleware, getUser);
router.get('/test', authMiddleware, permissionUser('admin'), (req, res) => {
    res.status(200).send('Berhasil masuk')
});

export default router;