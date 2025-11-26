import jwt from 'jsonwebtoken';
import {User} from '../models/User.model.js';

export const registerController = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        
        if(!email || !password || !role){
            return res.status(400).json({error: 'Please provide all required fields'});
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
        return res.status(401).json({error: "Email is not valid!"});
        }

        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({error: 'User already exists'});
        }

        if(password.length<6){
        return res.status(401).json({error: "Password must be atleast of 6 characters"});
        }
        
        const newUser = await User.create({
            email,
            password,
            role
        });
  
        const token = jwt.sign(
            {userId: newUser._id, role: newUser.role}, 
            process.env.JWT_SECRET, 
            {expiresIn: '7d'}
        );
        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.status(201).json({
            message: 'User registered successfully', 
            userId: newUser._id
        });
        
    } catch (error) {
        console.log("Error in register controller:", error);
        res.status(500).json({error: 'Internal Server Error in register controller'});
    }
}

export const loginController = async (req, res) => {
    try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: 'Please provide all required fields'});
    }
    
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    
    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
        return res.status(409).json({error: 'Invalid password'});
    }

    const token = jwt.sign(
        {userId: user._id, role: user.role}, 
        process.env.JWT_SECRET, 
        {expiresIn: '7d'}
    );

    res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: 'Login successful', 
        userId: user._id
    });

    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({error: 'Internal Server Error in login controller'});
    }
}