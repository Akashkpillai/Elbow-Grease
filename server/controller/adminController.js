const express = require('express')
const router = express.Router()
const Admins = require('../model/adminModel')
const Users = require('../model/userModel')
const Expert = require('../model/expertModal')
const jwt = require('jsonwebtoken')
const Category = require('../model/CategoryModel')
const {uploadToCloudinary} = require('../config/ColudUpload')
const Service = require('../model/ServiceModel')
const User = require('../model/userModel')
const Booking = require('../model/BookingModel')


const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const admin = await Admins.findOne({email})
        console.log(admin)
        if (! admin) {
            return res.status(400).json({msg: "Please check the email"});
        }
        if (admin.password == password) {
            const token = jwt.sign({
                _id: admin._id,
            }, process.env.JWT_SECRET_KEY)
            return res.json({msg: "Login Successful", token: token});
        } else {
            return res.status(400).json({msg: "Please check the password"});
        }


    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const userDetailes = async (req, res) => {
    const users = await Users.find()
    //    console.log(users);
    try {
        if (! users) {
            return res.status(400).json({msg: "No Users found"});
        } else {
            return res.json({msg: "Found it!", details: users});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const blockUser = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await Users.findByIdAndUpdate({
                _id: id
            }, {blockStatus: true})
            return res.json({msg: "block Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const UnblockUser = async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const user = await Users.findByIdAndUpdate({
                _id: id
            }, {blockStatus: false})
            return res.json({msg: "Unblock Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const category = async (req, res) => {
    try {
        const cat = await Category.find()
        if (!cat) {
            return res.status(400).json({msg: "No data"});
        } else {
            return res.json({msg: "category!", details: cat});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }

}

const addCategory = async (req, res) => {
    newCat = req.body.category

    try {
        const result = await Category.findOne({category:{ $regex:new RegExp("^" +newCat.toLowerCase(),"i",) }})
        if (result) {
            return res.status(400).json({msg: "Already exist"});
        } else {
            let category = new Category({category: newCat})
            category.save()
            return res.json({msg: "category added!", details: category});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const deletCategory = async (req, res) => {
    id = req.params.id
    try {
        if (id) {
            const user = await Category.findByIdAndDelete({_id: id})
            return res.json({msg: "Deleted successfuly!"});
        } else {
            return res.status(400).json({msg: "No data updated"});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const addService = async(req,res) =>{
    try {
        const data = req.body.values;
        // console.log(data);
        const images = data.image.fileList;
        //  console.log(images)
        const dataimages = [];
        const bar = new Promise((resolve, reject) => {
          images.forEach(async (image, index, array) => {
            // console.log(image);
            const datas = await uploadToCloudinary(image.thumbUrl, "Service-images");
            // console.log(datas.url);
            dataimages.push(datas.url);
  
            if (index === array.length - 1) resolve();
          });
        });
        bar.then(() => {
          const datenow = new Date();
          const Dateposted = datenow.toDateString();
        //   console.log(dataimages, "this is data");
          const servicedetails = new Service({
            title: data.title,
            price: data.Price,
            note:data.note,
            discription:data.discription,
            image: dataimages,
            date: Dateposted,
          });
          servicedetails.save().then(() => {
            res.json({ msg: "added successfully" });
          });
        });
      } catch (error) {
        console.log(error);
      }
}

const getService = async(req,res)=>{
    try {
        const service = await Service.find()
        if (!service) {
            return res.status(400).json({msg: "No data"});
        } else {
            return res.json({msg: "Services!", details: service});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const expertDetailes = async (req, res) => {
    const users = await Expert.find({status:"pending"})
    try {
        if (!users) {
            return res.status(400).json({msg: "No Expert found"});
        } else {
            return res.json({msg: "Found it!", details: users});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const acceptedExperts = async (req, res) => {
    const users = await Expert.find({
        $or:[
        {status:"accepted"},
        {status:"blocked"}
        ]
    }
    )
    try {
        if (!users) {
            return res.status(400).json({msg: "No Experts found"});
        } else {
            return res.json({msg: "Found it!", details: users});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const acceptExperts = async(req,res) =>{
    const id = req.params.id;
    try {
        if (id) {
            const user = await Expert.findByIdAndUpdate({
                _id: id
            }, {status:"accepted"})
            return res.json({msg: "Accepted Updated!", details: user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const blockExpert = async(req,res) =>{
    const id = req.params.id;
    try {
        if (id) {
            const user = await Expert.findByIdAndUpdate({
                _id: id
            },{status:"blocked" })
            // console.log(user);
            return res.json({msg: "Block Updated!", details:user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const unblockExpert = async(req,res) =>{
    const id = req.params.id;
    try {
        if (id) {
            const user = await Expert.findByIdAndUpdate({
                _id: id
            },{status:"accepted"})
            // console.log(user);
            return res.json({msg: "Block Updated!", details:user});
        } else {
            return res.status(400).json({msg: "Not updated"});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const deleteServices = async (req, res) => {
    id = req.params.id
    // console.log(id);
    try {
        if (id) {
            const service = await Service.findByIdAndDelete({_id:id})
            console.log(service);
            return res.json({msg: "Deleted successfuly!"});
        } else {
            return res.status(400).json({msg: "No data deleted"});
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const getUserCount = async (req,res) => {
    try {
        const user = await User.find({blockStatus:false}).count()
        if(!user){
            return res.status(400).json({msg: "No user data"});
        }
        return res.json({msg: "Deleted successfuly!",count:user});
    } catch (error) {
        return res.status(500).json({msg: error.message}) 
    }
}

const getExpertCount = async (req,res) => {
    try {
        const user = await Expert.find({status:"accepted"}).count()
        if(!user){
            return res.status(400).json({msg: "No user data"});
        }
        return res.json({msg: "Deleted successfuly!",count:user});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const getDealCount = async (req,res) => {
    try {
        const user = await Booking.find().count()
        if(!user){
            return res.status(400).json({msg: "No booking data"});
        }
        return res.json({msg: "Deleted successfuly!",count:user});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}





module.exports = {
    adminLogin,
    userDetailes,
    blockUser,
    UnblockUser,
    category,
    addCategory,
    deletCategory,
    addService,
    getService,
    expertDetailes,
    acceptExperts,
    blockExpert,
    acceptedExperts,
    deleteServices,
    unblockExpert,
    getUserCount,
    getDealCount,
    getExpertCount
}
