import mongoose from "mongoose";  
import dotenv from "dotenv"; 
dotenv.config();

// console.log(process.env.MONGODB_URL);

export const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error connecting to database:", error);
        process.exit(1);
    }
}