import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
movie:{
    type: mongoose.Schema.Types.Object,
    ref: "Movies"
},
date:{
    type:String,
    required:true
},
showTime:{
    type:String,
    required:true
},
seat:{
    type:[String],
    required:true
},
amount:{
    type:Number,
    required:true
}
})

const Booking = mongoose.model("Booking",bookingSchema);
export {Booking}