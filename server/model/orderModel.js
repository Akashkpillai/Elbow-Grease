const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    addtionalDiscription:{
        type:String
    },
    Date:{
        type:String,
        required:true
    },
    address:{
        type:Object
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    isAccepted:{
        default:false
    },
    accepteBy:{
        type:Schema.Types.ObjectId,
        ref:"Expert"
    },
    Payment:{
        type:String
    },
    Status:{
        type:String,
        default:"pending"
    } 
})

const Booking = mongoose.model('Booking', orderSchema);
module.exports = Booking;