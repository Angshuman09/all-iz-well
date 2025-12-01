import { Mood } from "../models/Mood.model.js";
import { Student } from "../models/Student.model.js";

export const setMoodController = async (req, res) => {
    try {
        const { mood } = req.body;
        const userId = req.userId; 

        if (!mood) {
            return res.status(400).json({ error: "Mood is required" });
        }

        const allowedMoods =[-2, -1, 0, 1, 2];
        if (!allowedMoods.includes(mood)) {
            return res.status(400).json({ error: "Invalid mood value" });
        }

        const student = await Student.findById(userId);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        await Mood.create({
            mood,
            student: userId
        });

        return res.status(201).json({
            message: "Mood set successfully"
        });

    } catch (error) {
        console.log("Error in set mood controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

