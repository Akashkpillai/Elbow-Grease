const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken')
const helpers = require('../helpers/adminHelper');
const User = require('../model/userModel');

const authUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            let user=await User.findOne({_id:decoded._id})
                if(user){
                    
            req.user = user;
            next()
                }else{
                    throw new Error("User Not Found")
                }
            
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
    if (!token) {
        return res.status(400).json({msg: "Invalid authentication."})
    }

}

module.exports = {
    authUser
}
