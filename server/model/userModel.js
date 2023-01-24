const mongoose=require('mongoose')
const Schema = mongoose.Schema

const userSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    blockStatus:{
        type:Boolean
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dszrnazsx/image/upload/v1673862714/Profile_jmbkz2.png"
    },
    address:[{
        name : {type:String},
        mobile : {type:Number},
        address1: {type:String},
        address2 :{type:String},
        city : {type:String},
        state : {type:String},
        zip :{type:String}
    }]

},{timestamps : true})

const User=mongoose.model('User',userSchema)
module.exports=User