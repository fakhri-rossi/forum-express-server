import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username harus diisi'],
        unique: [true, 'Username sudah digunakan']
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: [true, 'Email sudah digunakan'],
        validate: {
            validator: validator.isEmail,
            message: 'Inputan harus berupa Email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', async function(){
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;