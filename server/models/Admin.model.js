import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    phoneNumber: {
        type: String,
        required: true
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    },
    collegeStamps: {
        type: String,
        required: true
    },
    TermnsAndConditions: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Admin = mongoose.model('Admin', adminSchema);