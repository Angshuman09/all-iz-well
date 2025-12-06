import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './lib/db.js';
import userAuthRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import adminRoutes from './routes/admin.routes.js';
import collegeRoutes from './routes/college.routes.js'
import featuresRoutes from './routes/features.routes.js'
import counsellorRoutes from './routes/counsellor.routes.js'
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

app.use('/api/v1/auth', userAuthRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/college', collegeRoutes);
app.use('/api/v1/features', featuresRoutes);
app.use('/api/v1/counsellor', counsellorRoutes);

app.get('/health', (req, res) => {
  res.send('Server is healthy');
})
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});

