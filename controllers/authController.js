import User from '../models/User.js';

export const registerUser = async(req, res) => {
    try {
        const createUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        return res.status(201).json({
            message: 'Register berhasil',
            data: createUser
        })
    } catch (error) {
        return res.status(400).json({
            message: 'error',
            error
        });
    }
}

export const loginUser = (req, res) => {
    res.send('Login berhasil!');
}

export const logoutUser = (req, res) => {
    res.send('Logout berhasil!');
}

export const getUser = (req, res) => {
    res.send('GetUser berhasil!');
}
