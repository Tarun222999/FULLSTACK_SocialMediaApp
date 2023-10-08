import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from './routes/messageRoutes.js'
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

connectDB();
const app = express();


const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




//middleware that runs bettwen req and res
app.use(express.json({ limit: "50mb" })) //to pasre the json data in req.bosy
app.use(express.urlencoded({ extended: true }))//to parse from data in req.body
app.use(cookieParser())


app.use('/api/users', userRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/messages', messageRoutes);

app.listen(5000, () => {
    console.log(`server started at ${PORT}`)
})