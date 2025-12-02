import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    type: {
        type: String,
        enum: ['phq-9', 'gad-7'],
        required: true
    },
    answers: [{
        type: Number,
        min: 0,
        max: 3,
        required: true
    }],
    score: {
        type: Number,
        required: true
    },
    severity: {
        type: String,
        enum: ['minimal', 'mild', 'moderate', 'moderately-severe', 'severe'],
        required: true
    },
    isCritical: {
        type: Boolean,
        default: false
    },
    counsellorNotified: {
        type: Boolean,
        default: false
    },
    notificationSentAt: {
        type: Date
    }
}, { timestamps: true });

assessmentSchema.index({ student: 1, createdAt: -1 });

export const Assessment = mongoose.model('Assessment', assessmentSchema);