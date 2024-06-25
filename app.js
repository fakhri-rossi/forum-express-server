import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to DB
mongoose.connect(process.env.DATABASE)
    .then((result) => {
        console.log('Connected to DB!');
    }).catch((err) => {
        console.log('Err while connecting to DB', err);
    });

// Middleware
app.use(cors());


// entpoint
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Message from entpoint!'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});