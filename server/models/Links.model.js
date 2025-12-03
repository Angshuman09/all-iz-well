import mongoose from "mongoose";

const addLinksSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    links: [{
        type: String,
        required: true,
        default: "",
    }],
})

export const AddLink = mongoose.model("AddLink", addLinksSchema);