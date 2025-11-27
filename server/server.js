import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './lib/db.js';   
import userAuthROutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();
const app = express();  

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/v1/auth', userAuthROutes);

app.get('/health', (req, res)=>{
    res.send('Server is healthy');
})
app.listen(3000, () => { 
    console.log(`Server is running on port ${port}`); 
    connectDb();
});

