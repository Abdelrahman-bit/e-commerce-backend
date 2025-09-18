import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'

const port = 5000;
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/e-commerce")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));


app.use('/users', userRouter);



app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})