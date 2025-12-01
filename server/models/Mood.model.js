import mongoose from 'mongoose';

const moodSchmma = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    mood: {
        type: Number,
        enum: [-2, -1, 0, 1, 2],
        required: true
    }
},{timestamps: true});

export const Mood = mongoose.model('Mood', moodSchmma);