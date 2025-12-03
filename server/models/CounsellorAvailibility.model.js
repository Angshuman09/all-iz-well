import mongoose from 'mongoose';

const counsellorAvailabilitySchema = new mongoose.Schema({
    counsellor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counsellor',
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    timeSlots: [{
        startTime: {
            type: String, // Format: "HH:MM" (24-hour format)
            required: true
        },
        endTime: {
            type: String, // Format: "HH:MM"
            required: true
        },
        isBooked: {
            type: Boolean,
            default: false
        },
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

counsellorAvailabilitySchema.index({ counsellor: 1, date: 1 });

export const CounsellorAvailability = mongoose.model('CounsellorAvailability', counsellorAvailabilitySchema);