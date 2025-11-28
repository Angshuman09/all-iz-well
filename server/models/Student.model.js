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
    semester:{
        type: Number,
        enum: [1,2,3,4,5,6,7,8],
        required: true
    }
});

export const Student = mongoose.model('Student', studentSchema);