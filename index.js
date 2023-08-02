import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DataBaseConnection } from "./DataBaseConnection.js";
import { signupRouter } from "./Routes/Signup.js";
import { loginRouter } from "./Routes/Login.js";
import { movieRouter } from "./Routes/Movie.js";
import { bookingRouter } from "./Routes/Booking.js";



dotenv.config();
DataBaseConnection();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    try{
        res.send("Welcome to TIcket Booking server")
    }
    catch(error){
        res.status(500).send({message:"Internal Server Error"})
    }
 }); 

app.use("/",signupRouter)
app.use("/",loginRouter)
app.use("/",movieRouter)
app.use("/",bookingRouter)
 app.listen(PORT,()=>console.log(`server started at ${PORT}`));