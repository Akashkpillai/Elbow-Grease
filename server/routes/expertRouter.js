const express = require('express')
const router = express.Router()
const services = require('../controller/expertController')
const bookingService = require('../controller/bookingController');
const {authExpert} = require('../middleware/expertAuth')

router.post('/signup',services.expertSignup)
router.post('/login',services.loginExpert)

router.get('/getExpert',authExpert,services.expertDetails)
router.post('/edit-profile',authExpert,services.editProfile)
router.get('/bookingDetails/:id',authExpert,bookingService.getBookingById)



router.get('/booking',authExpert,bookingService.getBookingByCategory)
router.get('/accepted-booking',authExpert,bookingService.getAcceptedBooking)
router.get('/completed-booking',authExpert,bookingService.getCompleteBooking)
router.get('/bookingDetails/:id',authExpert,bookingService.getBookingById)
router.post('/acceptbooking/:id',authExpert,bookingService.acceptBooking)   
router.get('/completebooking/:id',authExpert,bookingService.completeBooking)
router.post('/rejectbooking/:id',authExpert,bookingService.rejectBooking)    
router.get('/rejectbooking/:id',authExpert,bookingService.rejectBooking)





module.exports = router