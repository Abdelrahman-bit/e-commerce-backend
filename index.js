import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

const port = 5000;
const app = express();
app.use(express.json());

mongoose
	.connect("mongodb+srv://abdolela670_db_user:SEM0A4JzoIallZfb@cluster0.gu12vhh.mongodb.net/e-commerce")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));


app.use('/users', userRouter);
app.use('/products', productRouter)


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})