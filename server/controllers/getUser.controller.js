import {User} from "../models/User.model.js";

export const getData = async (req,res)=>{
    const {userId} = req.body;
    if(!userId){
        return res.status(400).json({success:false,message:"userId not found"});
    }

    try {
        const user = await User.findById(userId);
        res.status(200).json({
            success:true,
            userData:{
                email:user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(401).json({success:false,message:"getting problem to get data"});
    }
}