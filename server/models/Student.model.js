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
    },
    gender:{
        type: String,
        enum: ['male','female', 'other'],
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    collegeId:{
        type: String,
        required: true,
    },
    phoneNUmber:{
        type: String,
        required: true,
    }  
});

export const Admin = mongoose.model('Admin', studentSchema);