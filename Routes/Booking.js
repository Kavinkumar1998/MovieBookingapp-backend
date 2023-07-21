import express from "express";
import {Booking} from "../Model/Booking.js";

const router = express.Router();

//router adding booking
router.post("/addTicket",async(req,res)=>{
    try{
const {movie,date,showTime,row,seatNo,amount}=req.body;
let booked = await Booking.findOne({movie:movie});
if(booked){
    res.status(400).json({message:"Booking already exists"});
}else{
    let newBooking = await Booking(movie,date,showTime,row,seatNo,amount).save();
    res.status(200).json({message:"Booking saved successfully"})
}
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

//router for getting data
router.get("/Bookings",async(req,res)=>{
    try{
const movies = await Booking.find();
res.status(200).json(movies)
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

//router for delete booking
router.delete("/cancelBookings/:id",async(req,res)=>{
    try{
        const {id}= req.params;
const cancelBookings = await Booking.findByIdAndDelete({_id:id});
if(!cancelBookings){
    res.status(400).json({message:"Error deleting bookings"})
}else{
    res.status(200).json({message:"Booking canceled"})
}
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

const bookingRouter = router;

export {bookingRouter};