import { Counsellor } from "../models/Counsellor.model";
import { User } from "../models/User.model";

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

        const newUser = await User.create({
            email,
            password,
            role:"counsellor"
        })

        const phoneregex = /^[6-9]\d{9}$/;

        if(phoneregex.test(phoneNumber)){
            return res.status(409).json({error: "phone number is not valid"});
        }

        const counsellor = await Counsellor.create({
            fullName,
            phoneNumber,
            gender,

        })

        //thinking have some issue with how to get the collegeName of the counsellor

    } catch (error) {
        console.log(`error in add counsellor controller: ${error}`);
        res.status(500).json({ error: `error in add counsellor controller: ${error}` })
    }
}