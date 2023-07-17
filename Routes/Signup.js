import express from "express";
import bcrypt from "bcrypt";
import {User, generateAuthToken } from "../Model/Users.js";

const router = express.Router();

router.post("/Signup", async (req,res)=>{
    try{
const{Name,Email,Password}=  req.body;
console.log(Name,Email,Password);
let user = await User.findOne({Email:Email});
if(user){
    res.status(400).json({message:"User already exists"});}
else if(Password.length < 6){
    res.status(200).json({message:"Password must be 8 characters"});
}
else{
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(Password,salt);
    //user updation
    user= await User({
        Name:Name,
        Email:Email,
        Password:hashedPassword
    }).save();
    const token= generateAuthToken(user._id)
    res.status(200).json({message:"Successfully Signed In",token})
}
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
})


export const signupRouter= router;