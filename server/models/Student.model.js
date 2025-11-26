import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    displayName:{
        type: String,
        requrired: true,
    },
    collegeName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    }
    
});

export const Admin = mongoose.model('Admin', studentSchema);