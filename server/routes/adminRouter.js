const express = require('express')
const router = express.Router()
const services = require('../controller/adminController')
const adminauth = require('../middleware/authAdmin')
const booking = require('../controller/bookingController')


router.post('/admin', services.adminLogin)
router.get('/allusers', adminauth.authAdmin, services.userDetailes)
router.put('/block/:id', services.blockUser)
router.put('/unblock/:id', services.UnblockUser)

router.get('/category', adminauth.authAdmin, services.category)
router.post('/addcategory', services.addCategory)
router.delete('/delete-category/:id', services.deletCategory)

router.get('/service', adminauth.authAdmin, services.getService)
router.post('/addService', services.addService)
router.put('/delete_service/:id', services.deleteServices)


router.get('/expertPending', adminauth.authAdmin, services.expertDetailes)
router.get('/acceptedExperts',adminauth.authAdmin,services.acceptedExperts)
router.put('/accept/:id', services.acceptExperts)
router.put('/expertEblock/:id',services.blockExpert)

router.get('/booking-page',adminauth.authAdmin,booking.getAllBooking) 
router.get('/booking-details/:id',booking.getBookingById)

router.get('/getUserCount',adminauth.authAdmin,services.getUserCount)
router.get('/getExpertCount',adminauth.authAdmin,services.getExpertCount)
router.get('/getDealCount',adminauth.authAdmin,services.getDealCount)
router.get('/Allcategory',services.getCategory)



module.exports = router
