import { Student } from "../models/Student.model.js";
import { College } from "../models/College.model.js";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

export const studentFormController = async (req, res) => {
    try {
        const { collegeName, gender, age, collegeCode, semester } = req.body;

        if (!collegeName || !gender || !age || !collegeCode || !semester) {
            return res.status(400).json({ error: "Field is needed" });
        }

        const college = await College.findOne({ name: collegeName });

        if (!college) {
            return res.status(404).json({ error: "college not found" });
        }

        if (college.collegeCode != collegeCode) {
            return res.status(409).json({ error: "College code is invalid" });
        }

        if (age < 16) {
            return res.status(400).json({ error: "Student must be atleast 16 years" });
        }

        if (semester > 8) {
            return res.status(400).json({ error: "Semester must be lesser than 8" });
        }

        const displayName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
            length: 2,
            separator: "-",
            style: "lowerCase",
        });

        const student = new Student({
            collegeName: college._id,
            gender,
            age,
            semester,
            displayName,
            isProfileComplete: true,
            userId: req.userId  
        });

        await student.save();

        res.status(201).json({ student });
    } catch (error) {
        console.log("Error in student form controller:", error);
        res.status(500).json({ error: 'Internal Server Error in student form controller' });
    }
};

export const getStudentData = async (req, res) => {
    try {
        console.log(req.userId);
        const student = await Student.findOne({ userId: req.userId })
            .populate("collegeName", "name");

        if (!student) {
            return res.status(404).json({ error: "student not found" });
        }

        return res.status(200).json({
            name: student.displayName,
            college: student.collegeName.name,
            message: "student data fetched successfully"
        });

    } catch (error) {
        console.log("Error in get student data controller:", error);
        res.status(500).json({ error: "Internal Server Error in get student data controller" });
    }
};

export const getTotalStudents = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();

        return res.status(200).json({
            success: true,
            totalStudents,
        });
    } catch (error) {
        console.error("Error fetching total students:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
