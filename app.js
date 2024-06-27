import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './router/authRouter.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

// Middleware
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if(process.env.NODE_DEV === "development"){
    app.use(morgan('dev'));
}

// connect to DB
mongoose.connect(process.env.DATABASE)
    .then((result) => {
        console.log('Connected to DB!');
    }).catch((err) => {
        console.log('Err while connecting to DB', err);
    });



// entpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Message from entpoint!'
    });
});

// Parent Router
app.use('/api/v1/auth', authRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});