const mongoose=require('mongoose')
const Schema=mongoose.Schema

const adminSchema=new Schema({
   email:{type:String,required:true},
   password:{type:String,required:true}
})

const Admins=mongoose.model('admins',adminSchema)

module.exports=Admins;