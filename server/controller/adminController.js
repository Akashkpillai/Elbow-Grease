const express = require('express')
const router = express.Router()
const Admins = require('../model/adminModel')
const Users = require('../model/userModel')
const jwt = require('jsonwebtoken')
const Category = require('../model/CategoryModel')


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
                email: admin.email
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
    // console.log(id);
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






module.exports = {
    adminLogin,
    userDetailes,
    blockUser,
    UnblockUser,
    category,
    addCategory,
    deletCategory
}
