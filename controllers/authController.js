import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import { ErrorHelper } from '../middleware/ErrorHelper.js';

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '6d'
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOption = {
        expires: new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: false
    }
    user.password = undefined;
    
    res.cookie('jwt', token, cookieOption);
    res.status(statusCode)
    .json({
        data: user,
        jwt: token,
        cookieOption: cookieOption
    });

}

export const registerUser = asyncHandler(async(req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const createUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role
    });

    createSendToken(createUser, 201, res);
})

export const loginUser = asyncHandler( async (req, res) => {
    // Validasi jika email/password ga diisi
    if(!req.body.email || !req.body.password){
        throw new ErrorHelper(`Email dan password harus diisi!`, 400);
    }

    // Check jika email sudah didaftarkan
    const userData = await User.findOne({
        email: req.body.email
    });

    if(userData){
        if(await userData.comparePassword(req.body.password)){
            createSendToken(userData, 201, res);

        } else {
            throw new ErrorHelper('Incorrect password', 401);
        }

    } else {
        throw new ErrorHelper(`User not found`, 400);
    }
})

export const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({
        message: 'Cookie berhasil dihapus'
    })
}

export const getUser = async(req, res) => {
    const user = await User.findById(req.user.id).select({ password: false });
    if(!user){
        throw new ErrorHelper(`User not found`, 401);
    } else {
        return res.status(200)
        // .setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/')
        .json({
            user
        })
    }
}
