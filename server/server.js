import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();  

const port = process.env.PORT || 3000;

app.get('/health', (req, res)=>{
    res.send('Server is healthy');
})
app.listen(3000, () => { 
    console.log(`Server is running on port ${port}`); 
});