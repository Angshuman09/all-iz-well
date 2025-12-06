import { Admin } from "../models/Admin.model.js";
import { Student } from "../models/Student.model.js";

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ error: 'Unauthorized - No role found' });
        }

        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({
                error: `Forbidden - ${req.role} role is not allowed to access this resource`,
                requiredRoles: allowedRoles
            });
        }
        next();
    };
};

// admin
export const isAdmin = async (req, res, next) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden - Admin access required'
            });
        }
        next();
    } catch (error) {
        console.log(`error in admin middleware: ${error}`);
        res.status(500).json({ error: `error in admin middleware: ${error}` })
    }
};

//counsellor
export const isCounsellor = (req, res, next) => {
    if (req.role !== 'counsellor') {
        return res.status(403).json({
            error: 'Forbidden - Counsellor access required'
        });
    }
    next();
};

//student
export const isStudent = async (req, res, next) => {
    try {
        if (req.role !== 'student') {
            return res.status(403).json({ error: 'Forbidden - Student access required' });
        }

        const student = await Student.findOne({ userId: req.userId });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        req.studentId = student._id;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const isSuperAdmin = (req, res, next) => {
    if (req.role !== 'superadmin') {
        return res.status(403).json({
            error: 'Forbidden - Superadmin access required'
        });
    }
    next();
}

export const getCollege = async (req, res, next) => {
    try {
        console.log("req.userId:", req.userId);
        const admin = await Admin.findOne({ userId: req.userId });
        console.log("Admin found:", admin);
        // console.log(await Admin.find({}))
        req.college = admin.collegeName;
        next();
    } catch (error) {
        console.log(`error in getCollege middleware: ${error}`);
        res.status(500).json({ error: `error in getCollege middleware: ${error}` })
    }
}
