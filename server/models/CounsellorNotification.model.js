import mongoose from 'mongoose';

const counsellorNotificationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    counsellor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counsellor',
        required: true,
    },
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true,
    },
    type: {
        type: String,
        enum: ['phq-9', 'gad-7'],
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'viewed', 'appointment-scheduled', 'contacted'],
        default: 'pending'
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    viewedAt: {
        type: Date
    },
    contactedAt: {
        type: Date
    }
}, { timestamps: true });

counsellorNotificationSchema.index({ counsellor: 1, status: 1, createdAt: -1 });

export const CounsellorNotification = mongoose.model('CounsellorNotification', counsellorNotificationSchema);
