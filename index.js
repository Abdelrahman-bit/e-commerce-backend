import express from 'express'
import mongoose from 'mongoose'

const port = 8000;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/e-commerce', (err)=>{
    if(!err){
        console.log('connected to database');
    }
})



app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})