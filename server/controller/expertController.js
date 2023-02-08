const { Module } = require('module');
const Expert = require('../model/expertModal')
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const expertSignup =(req, res) => {
    const { name, email, newPassword,phone,city,address,category} = req.body;
    if (!email || !newPassword || !name || !address || !city || !phone || !category) {
      return res.status(400).json({ error: "please add all the fields" });
    }
    Expert.findOne({phone:phone})
      .then((savedUser) => {
        if (savedUser) {
          return res
            .status(400)
            .json({ error: "user already exists with this number" });
        }
        bcrypt.hash(newPassword, 12).then((hashedpassword) => {
          const user = new Expert({
            name,
            email,
            password: hashedpassword,
            phone,
            address,
            serviceLocation:city,
            serviceType:category
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfully"});
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        return res.status(500).json({msg: err.message})
      });
  };


  const loginExpert = async (req, res) => {
    try {
        const {phone, password} = req.body
        const user = await Expert.findOne({phone})
        if (!user) {
            return res.status(400).json({msg: "Please check the number"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (! isMatch) {
            return res.status(400).json({msg: "Invalide Password"});
        }
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET_KEY)
        return res.json({msg: "Login Successful", data: token});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const expertDetails = async(req,res) =>{
  try {
     const expert =  req.expert._id
     const result = await Expert.findOne({id:expert}).select('-password')
    //  console.log(result);
    return res.json({data: result});
  } catch (error) {
    return res.status(500).json({msg: error.message});
   }
}

const editProfile = async(req,res) =>{
  try {
    const {data,name,email,city} = req.body
    const datas = await uploadToCloudinary(data, "Expert-Profileimages");
    const users = await Expert.findOne(req.expert._id)
    users.image = datas.url
    users.name = name
    users.email = email
    users.serviceLocation = city
    users.save()
    res.status(200).json({msg:"Updated successfully"})
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
}


  





  module.exports = {
    expertSignup,
    loginExpert,
    expertDetails,
    editProfile
  }