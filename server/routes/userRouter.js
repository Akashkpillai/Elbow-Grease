const express = require('express')
const router = express.Router();
const services = require('../controller/userController');
const bookingService = require('../controller/bookingController');
const paymentService = require('../controller/paymentController')
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

router.post('/booking',authUser,bookingService.createBooking)

router.get('/bookingDetails/:id',authUser,bookingService.getBookingById)

router.get('/payment/:id',bookingService.paymentCompleted)

router.get('/booking',authUser,bookingService.getBookingByUser);

router.get('/cancelbooking/:id',authUser,bookingService.cancelBooking);

router.post('/create-checkout-session',paymentService.StripePayment);

router.post('/edit-profile',authUser,services.profileEdit)


module.exports = router
