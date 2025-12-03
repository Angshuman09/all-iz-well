import mongoose from 'mongoose'

const journalSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    content: [{
        title: {
            type: String,
            required: true,
            min: 3,
        },
        content: {
            type: String,
            required: true,
            min: 3,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

export const Journal = mongoose.model('Journal', journalSchema);
