import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/Cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());


//api endpoints
app.use('/api/admin',adminRouter);
//localhost:4000/api/admin/add-doctor 
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter)


app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});