const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const services = require('../controller/userController')
const auth = require("../middleware/auth")
//Signup for user
router.post('/signup',services.register)

router.post('/activation',services.activateMail)

router.post('/login',services.loginUSer)

router.post('/refresh_Token',services.getAccessToken)

router.post('/forgot',services.forgotPassword)

router.post('/reset',auth,services.resetPassword)

router.get('/info',auth,services.getUserIfo)










module.exports = router