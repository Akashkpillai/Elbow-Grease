const express = require('express')
const router = express.Router();
const services = require('../controller/userController')
const auth = require("../middleware/auth");
const {authUser} = require('../middleware/userAuth');


// Signup for user
router.post('/signup', services.register)

router.post('/activation', services.activateMail)

router.post('/login', services.loginUSer)

router.post('/refresh_Token', services.getAccessToken)

router.post('/forgot', services.forgotPassword)

router.post('/reset', auth, services.resetPassword)

router.get('/info', authUser, services.getUserIfo)

router.get('/services',services.getServices)

router.post('/booking',services.booking)




module.exports = router
