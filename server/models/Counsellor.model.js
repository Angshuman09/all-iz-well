import mongoose from 'mongoose';

const counsellorSchema = new mongoose.Schema({
    fUllName:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    phoneNumber:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['male','female', 'other'],
    },
    collegeName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    },

    
});

export const Admin = mongoose.model('Admin', counsellorSchema);