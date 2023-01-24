const express = require('express')
const router = express.Router()
const services = require('../controller/expertController')


router.post('/signup',services.expertSignup)
router.post('/login',services.loginExpert)




module.exports = router