const express = require('express')
const router = express.Router()
const services = require('../controller/adminController')
const adminauth = require('../middleware/authAdmin')


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
router.put('/expertEblock/:id', services.blockExpert)


module.exports = router
