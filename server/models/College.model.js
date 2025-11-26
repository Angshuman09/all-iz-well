import mongoose, { mongo } from 'mongoose';

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
});

export const College = mongoose.model('College', collegeSchema);