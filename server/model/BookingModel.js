const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    discription:{
        type:String
    },
    date:{
        type:String,
        required:true
    },
    address:{
        type:Object
    },
    pincode:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    accepteBy:{
        type:Schema.Types.ObjectId,
        ref:"Expert"
    },
    payment:{
        type:String
    },
    status:{
        type:String,
        default:"Payment pending"
    },
    fixedChargeStatus:{
        type:String,
        default:"pending"
    } 
})

const Booking = mongoose.model('Booking', orderSchema);
module.exports = Booking;