import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    counsellorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Counsellor',
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {timestamps: true})  

export const Booking = mongoose.model('Booking', bookingSchema);    

