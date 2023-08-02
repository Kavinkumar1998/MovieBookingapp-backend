import express from "express";
import {Booking} from "../Model/Booking.js";

const router = express.Router();

//router adding booking
router.post("/addTicket",async(req,res)=>{
    try{
const {movie,date,showTime,seat,amount}=req.body;
let booked = await Booking.findOne({movie:movie});
if(booked){
    res.status(400).json({message:"Booking already exists"});
}else{
    let newBooking = await Booking(movie,date,showTime,seat,amount).save();
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
const newBooking = await Booking.find();
res.status(200).json(newBooking)
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
});

//route for geting booking by Id
router.get("Booking/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const booking = await Booking.findById({_id:id});
        if(!booking){
            res.status(400).json({message:"Booking Not Found"});
        }else{
            res.status(200).json(booking);
        }
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