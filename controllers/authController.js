import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '6d'
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOption = {
        expire: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: false
    }
    res.cookie('jwt', token, cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        data: user
    });
}

export const registerUser = asyncHandler(async(req, res) => {
    const createUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    createSendToken(createUser, 201, res);
    return res.status(400).json({
        message: 'error',
        error
    });
})

export const loginUser = asyncHandler( async (req, res) => {
    // Validasi jika email/password ga diisi
    if(!req.body.email || !req.body.password){
        res.status(400);
        throw new Error(`Email dan password harus diisi!`);
    }

    // Check jika email sudah didaftarkan
    const userData = await User.findOne({
        email: req.body.email
    });

    if(userData && (await userData.comparePassword(req.body.password))){
        createSendToken(userData, 201, res);

    } else {
        res.status(400);
        throw new Error(`Invalid User`);
    }
})

export const logoutUser = (req, res) => {
    res.send('Logout berhasil!');
}

export const getUser = (req, res) => {
    res.send('GetUser berhasil!');
}
