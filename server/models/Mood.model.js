import mongoose from 'mongoose';

const moodSchmma = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    mood: {
        type: String,
        enum: ["very sad", "sad", "neutral", "happy", "very happy"],
        required: true
    }
},{timestamps: true});


export const Mood = mongoose.model('Mood', moodSchmma);