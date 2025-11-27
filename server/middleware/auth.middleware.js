// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }

        req.user = user;
        req.userId = user._id;
        req.role = user.role;
        
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized - Token expired' });
        }
        
        res.status(500).json({ error: 'Internal Server Error in auth middleware' });
    }
};