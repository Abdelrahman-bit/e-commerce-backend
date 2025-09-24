import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import authChecker from './middleware/authChecker.js'
import createError from './utils/createError.js'
import errorHandler from './middleware/errorHandler.js'

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // for form submissions
app.use(authChecker)
app.set("view engine", "ejs");
dotenv.config()

mongoose
	.connect(process.env.MONGO_ATLAS_CONNECTION)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));


app.use('/users', userRouter);
app.use('/products', productRouter);
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
	next(createError("Route not found", 404));
});

app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})