import express from "express";
import bcrypt from "bcrypt";
import { User,generateAuthToken } from "../Model/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const router= express.Router();
dotenv.config();

//route for login

router.post("/login", async (req,res)=>{
try{
const{Email,Password}=req.body;
const user = await User.findOne({Email:Email});
if(!user){
    res.status(400).json({message:"Invalid credentials"});
}
const ValidatePassword = await bcrypt.compare(Password,user.Password);
if(!ValidatePassword) {
    res.status(400).json({message:"Invalid password"});
}else{
const token = generateAuthToken(user._id);
const Name = user.Name;
const Email = user.Email;
const Id = user._id
res.status(200).json({message:"Loged In Sucessfully",Name,Email,Id,token})
}
}
catch(error){
    console.log(error)
    res.status(500).json({message:"Internal server error"})
}
})

//route for forgoet password

router.post("/forgetpassword",async (req,res)=>{
    try{
        const {Email}=req.body;
        const user = await User.findOne({Email:Email});
        if(!user){ 
            res.status(400).json({message:"Invalid Email"})
        }
        else{
            const randomNumber= Math.floor(100000 + Math.random()*900000);
        
            const setotp = await User.updateOne({Email:Email},{$set:{OTP:randomNumber}});
            console.log(setotp);
        const sender = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.email,
                pass:process.env.password,
            }
        });
        
        const composeMail = {
            from:process.env.email,
            to:Email,
            subject:"OTP for Password reset",
            text:`${randomNumber}`,
        
        };
        sender.sendMail(composeMail,(error,info)=>{
            if(error){
                console.log(error);
                return res.status(400).json({message:"sending error"});
            }
            else{
                res.status(200).json({message:"Email sent"});
            }
        });
        
        }
        res.status(200).json({message:"Mail sent to your Email"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
  
});

//router for verifying otp

router.post("/verifyotp",async(req,res)=>{
    try{
const {OTP}=req.body;
const otp = +OTP;
const verifyotp = await User.findOne({OTP:otp});
console.log(verifyotp);
if(!verifyotp){
    return res.status(400).json({message:"Invalid OTP"});
}else{
    const deleteotp = await User.updateOne({OTP:otp},{$unset:{OTP:otp}});
    return res.status(200).json({message:"Sucessfully verified"});
}
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});

//route with setpassword
router.post("/setPassword",async (req,res)=>{
    try{
const {Email,Password}=req.body;
let user = await User.findOne({Email:Email});
if(!user){
    res.status(400).json({message:"Email not exists"});
}
else if(Password.length<8){
    return res.status(400).json({message:"Password must be at least 8 charcters"});
}
else{
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(Password,salt);
    const updated={
        Email:Email,Password:hassedPassword
    }
    const update = await User.findOneAndUpdate({Email:Email},{$set:updated});
    res.status(200).json({message:"Password updated successfully"});
}
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})


export const loginRouter = router;