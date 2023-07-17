import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        maxlength:32
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    OTP:{
        type:Number
    }
})

const User= mongoose.model("User",userSchema);
 
const generateAuthToken=(id)=>{
    return jwt.sign({id},process.env.Secret_key)
 }

 export{User,generateAuthToken};