const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expertSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    serviceLocation: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:"pending"
    },
    // accepted service list 
    acceptedService: [{
        type: Schema.Types.ObjectId,

    }],
    // rejected service list
    rejectedService: [{
        type: Schema.Types.ObjectId,
    }],
    // pending service list
    pendingService: [{
        type: Schema.Types.ObjectId,
        
    }],
    // completed service list
    completedService: [{
        type: Schema.Types.ObjectId,

    }],
    image:{
        type:String,
        default:"https://res.cloudinary.com/dszrnazsx/image/upload/v1673862714/Profile_jmbkz2.png"
    },
    // service list
}, {
    timestamps: true
});

const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;