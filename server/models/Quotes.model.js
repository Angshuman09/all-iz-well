import mongoose from "mongoose";

const addQuotesSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    quotes: [{
        type: String,
        required: true,
        trim: true,
        default: ""
    }],
})

export const AddQuotes = mongoose.model("AddQuotes", addQuotesSchema);