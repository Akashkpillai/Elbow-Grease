const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema ({
    title :{
        type:String,
        required : true
    },
    price :{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image:[
        
    ]
},{timestamps:true})

const Service = mongoose.model('Services',serviceSchema)

module.exports = Service;