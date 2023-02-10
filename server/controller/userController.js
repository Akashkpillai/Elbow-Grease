const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const bycrypt = require('bcrypt')
const sendMail = require('./sendMail')
const Service = require('../model/ServiceModel')
const { uploadToCloudinary } = require('../config/ColudUpload')
require('dotenv').config()


const {REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACTIVATION_TOKEN_SECRET} = process.env

const {CLIENT_URL} = process.env
// console.log({CLIENT_URL})

const userCtrl = {
    register: async (req, res) => {
        try { // console.log(req.body);
            const {name, email, password, phone} = req.body

            if (!name || !email || !password || !phone) {
                return res.status(400).json({msg: "Please fill all feilds."})
            }

            if (! validateEmail(email)) {
                return res.status(400).json({msg: "Please enter a valide email!."})
            }
            const user = await User.findOne({email})
            if (user){{
                return res.status(400).json({msg:"Userr already exists."})
            }}const hashpassword = await bycrypt.hash(password, 12)

            const newUser = {
                name,
                email,
                password: hashpassword,
                phone
            }
            // console.log("New:",newUser)

            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            try {
                sendMail(email, url, "Verfiy your email address to start")
                res.json({msg: "Register success please activate your email to start"})
            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    activateMail: async (req, res) => {
        try {
            const {activation_token} = req.body;
            // console.log(activation_Token)
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
            console.log(user);

            const {name, password, email, phone} = user;
            const check = await User.findOne({email: email});
            if (check) 
                return res.status(400).json({msg: "This email is already exists"});
            

            const newUser = new User({
                name,
                email,
                password,
                phone,
                blockStatus: false
            });
            newUser.save();
            res.json({msg: "Account has been activated successfully!"});

        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    loginUSer: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (! user) {
                return res.status(400).json({msg: "Please check the email"});
            }

            if (user.blockStatus) {
                return res.status(400).json({msg: "Your are Banned"});
            }

            const isMatch = await bycrypt.compare(password, user.password);
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
    },
    getAccessToken: (req, res) => {
        try {
            const rf_Token = req.cookies.refreshToken;
            // console.log(rf_Token);
            if (! rf_Token) 
                return res.status(400).json({msg: "please login now!"});
            


            jwt.verify(rf_Token, REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) 
                    return res.status(400).json({msg: "Login failed"});
                

                const access_Token = createAccessToken({id: user._id});
                res.json({access_Token});

            });
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            // console.log(email);
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({msg: "This email dose not exist"});
            }
            const access_Token = createAccessToken({id: user.id});
            const url = `${CLIENT_URL}/users/reset/${access_Token}`;

            sendMail(email, url, "Reset Your password");
            res.json({msg: "Reset password link successfully send please check your email!"});

        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            const passwordHash = await bycrypt.hash(password, 12);
            // console.log(req.user)
            await User.findOneAndUpdate({
                _id: req.user.id
            }, {password: passwordHash})
            res.json({msg: "Password Successfully changed!."})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    getUserIfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getServices:async(req,res)=>{
        try {
            const sevices = await Service.find()
            res.status(200).json({msg:"services",data:sevices})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    profileEdit:async(req,res)=>{
        try {
            // console.log(req.user._id);
            const {data,name,phone} = req.body
            // console.log(data);
            const datas = await uploadToCloudinary(data, "User-Profileimages");
            const users = await User.findOne(req.user._id)
            // console.log(datas.url);
            users.avatar = datas.url
            users.name = name
            users.phone = phone
            users.save()
            res.status(200).json({msg:"Updated successfully"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }

}

function validateEmail(email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(email)
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

}




module.exports = userCtrl
