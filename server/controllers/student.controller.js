import { Student } from "../models/Student.model.js";
import { College } from "../models/College.model.js";

export const studentFormController = async (req, res)=>{
    try {
        const {collegeName, gender, age, collegeCode, semester} = req.body;
        if(!collegeName || !gender || !age || !collegeCode || !semester){
            return res.status(400).json({
                error:"Field is needed"
            })
        }
        const college = await College.findOne({name: collegeName});

        if(!college){
            return res.status(404).json({error: "college not found"});
        }

        if(college.collegeCode != collegeCode){
            return res.status(409).json({
                error: "College code is invalid"
            })
        }

        if(age<16){
            return res.status(400).json({
                error:"Student must be atleast 16 years"
            })
        }

        if(semester>8){
            return res.status(400).json({
                error: "Semester must be lesser than 8"
            })
        }

        const student = new Student({
            collegeName,
            gender,
            age,
            semester
        })

        student.save();

        res.status(201).json({student});
    } catch (error) {
        console.log("Error in student form controller:", error);
        res.status(500).json({ error: 'Internal Server Error in student form controller' });
    }
}