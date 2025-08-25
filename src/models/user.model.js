
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, 'Username is required' ],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;