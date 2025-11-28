import mongoose from  'mongoose';

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    AISHEcode:{
        type: String,
        required: true,
        unique: true
    },
    collegeCode:{
        type: String,
        required: true
    },
    InstitutionType:{
        type: String,
        enum:['Government', 'Private', 'Autonomous', 'Deemed University'],
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

export const College = mongoose.model('College', collegeSchema);