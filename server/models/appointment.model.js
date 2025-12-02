import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    meetingLink: {
        type: String // For online meetings
    },
    location: {
        type: String // For in-person meetings
    },
    notes: {
        type: String
    },
    cancelledBy: {
        type: String,
        enum: ['student', 'counsellor']
    },
    cancellationReason: {
        type: String
    }
}, { timestamps: true });

appointmentSchema.index({ student: 1, date: 1 });
appointmentSchema.index({ counsellor: 1, date: 1 });

export const Appointment = mongoose.model('Appointment', appointmentSchema);