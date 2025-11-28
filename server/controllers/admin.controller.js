import { Admin } from "../models/Admin.model.js";
import { College } from "../models/College.model.js";
// work in progress
export const adminFormController = async (req, res)=>{
    try {
        const {collegeName, collegeCode, AISHEcode, InstitutionType, address, phoneNumber, collegeStamp } = req.body;
        if(!collegeName || !collegeCode || !AISHEcode || !phoneNumber || !collegeStamp){
            return res.status(404).json({error: "All fileds are required"});
        }

        const phoneNumberRegex = /^[6-9]\d{9}$/;
        if(!phoneNumberRegex.test(phoneNumber)){
            return res.status(401).json({error: "phone number is not valid"});
        }

        const college = new College({
            name: collegeName,
            AISHEcode,
            collegeCode,
            InstitutionType,
            address
        })

        await college.save();

        const admin = new Admin({
            phoneNumber,
            collegeName: college
        })

        // admin.imageUrl = imageUrl;
        // admin.user = new mongoose.Types.ObjectId(req.userId);
        // admin.lastUpdated = new Date();
        
    } catch (error) {
        console.log("Error in student form controller:", error);
        res.status(500).json({ error: 'Internal Server Error in student form controller' });
    }
}

const uploadImage = async (file)=>{
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    return uploadResponse.url;
}