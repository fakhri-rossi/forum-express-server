import { ErrorHelper } from "./ErrorHelper.js";

const notFound = (req, res, next) => {
    throw new ErrorHelper(`Page ${req.originalUrl} not found`, 404);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode === 200 ? 500 : err.statusCode;
    let message = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Resource not found';
        statusCode = 404
    }

    if(err.name === 'ValidationError'){
        message = Object.values(err.errors).map((item) => item.message).join(', ');
        statusCode = 400
    }

    // if(err.message === 'Incorrect password'){
    //     // res.
    // }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export {notFound, errorHandler}