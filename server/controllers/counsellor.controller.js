import { Counsellor } from "../models/Counsellor.model.js";
import { User } from "../models/User.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CounsellorNotification } from "../models/CounsellorNotification.model.js";

export const addCounsellorController = async (req, res) => {
    try {
        const { email, password, fullName, phoneNumber, gender } = req.body;
        if (!email || !password || !fullName || !phoneNumber || !gender) {
            return res.status(400).json({ error: "Fields are required" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(401).json({ error: "Email is not valid!" });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(401).json({ error: "Password must be atleast of 6 characters" });
        }

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hash,
            role: "counsellor"
        })

        const phoneregex = /^[6-9]\d{9}$/;

        if (phoneregex.test(phoneNumber)) {
            return res.status(409).json({ error: "phone number is not valid" });
        }

        const counsellor = await Counsellor.create({
            fullName,
            phoneNumber,
            userId: newUser._id,
            gender,
            collegeName: req.college
        })

        return res.status(201).json({
            message: "Counsellor added successfully",
            data: counsellor
        })

    } catch (error) {
        console.log(`error in add counsellor controller: ${error}`);
        res.status(500).json({ error: `error in add counsellor controller: ${error}` })
    }
}

export const getCounsellorController = async (req, res) => {
    try {
        const counsellor = await Counsellor.find({ userId: req.userId });
        return res.status(200).json({
            message: "Counsellor fetched successfully",
            data: counsellor
        })
    } catch (error) {
        console.log(`error in get counsellor controller: ${error}`);
        res.status(500).json({ error: `error in get counsellor controller: ${error}` })
    }
}


export const getCriticalStudents = async (req, res) => {
    try {
        const counsellor = await Counsellor.findOne({ userId: req.userId });

        const notifications = await CounsellorNotification.find({
            counsellor: counsellor._id,
            severity: { $in: ["severe", "critical", "very severe"] },
            status: "pending"
        })
            .populate("student", "name email phone rollNo")
            .populate("assessment")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.error("Error fetching critical students:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
