import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.get('/', async (req, res) => {
    const result = await User.find()
    res.json(result)
})

export default router;