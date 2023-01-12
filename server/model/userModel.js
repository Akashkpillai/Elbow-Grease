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
        default:"https://res.cloudinary.com/duyaqqcyv/image/upload/v1672059302/profile_avathar_dss397.jpg"
    }

},{timestamps : true})

const User=mongoose.model('User',userSchema)
module.exports=User