import mongoose from "mongoose";  
import dotenv from "dotenv"; 

console.log(process.env.MONGODB_URL);
const connectDb = async () =>{
    await mongoose.connect();
}