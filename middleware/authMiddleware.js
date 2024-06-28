import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';
import { ErrorHelper } from './ErrorHelper.js';

export const authMiddleware =  asyncHandler( async (req, res, next) => {
    let token = req.cookies.jwt;

    if(!token){
        throw new ErrorHelper(`Unauthorized: can't access the page, you aren't login yet`, 401)
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        throw new ErrorHelper(`Unauthorized: Invalid Token`, 401)
    }

    const currentUser = await User.findById(decoded.id);

    if(!currentUser){
        throw new ErrorHelper(`Unauthorized: Invalid Uer Id`, 401)
    }
    req.user = currentUser;
    return next();

})

export const permissionUser = (...roles) => {
    // req.user.net
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            // throw new ErrorHelper(`Anda tidak bisa masuk ke halaman ini`, 403)
            return next(
                res.status(403).json({
                    message: 'Anda tidak dapat mengakses halaman ini'
                })
            )
        }
        next();
    }
}