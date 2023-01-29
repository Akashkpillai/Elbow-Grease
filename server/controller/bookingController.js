const Booking = require('../model/BookingModel');
const Expert = require('../model/expertModal');

// @route   POST api/booking
// @desc    Booking
// @access  Public

const createBooking = async (req, res) => { 
    try{
        let {discription, date, address, pincode, category, payment} = req.body;
        let userId = req.user._id;
        let booking = new Booking({userId, discription, date, address, pincode, category, payment});
        await booking.save();
        res.json({ message: "Booking successfully. Pay the amount to confirm the booking"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
// payment completed
const paymentCompleted = async (req, res) => {
    try{
        let bookingId = req.params.id || req.body.id;
        let booking = await Booking.findOne(  {_id: bookingId} );
        if(!booking){
            return res.status(404).json({message: "Booking not found"});
        }
        booking.status = "Payment completed";
        await booking.save();
        res.json({message: "Booking confirmed. Await for the expert to accept the booking"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
// @route   GET api/booking
// @desc    Get all booking
// @access  Public
const getAllBooking = async (req, res) => {
    try{
        let booking = await Booking.find();
        res.json(booking);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
// @route   GET api/booking/:id
// @desc    Get booking by id
// @access  Public
const getBookingById = async (req, res) => {
    try{
        let booking = await Booking.findById(req.params.id).populate('userId').select('-password, -__v, -createdAt, -updatedAt').populate('accepteBy').select('-password, -__v, -createdAt, -updatedAt');
        if(!booking){
            return res.status(404).json({message: "Booking not found"});
        }
        res.json(booking);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

// get booking by category wise for expert
const getBookingByCategory = async (req, res) => {
    
        try{
            let category = req.expert.serviceType;
            // show only not accepted booking for expert with category
            let booking =await Booking.find({category, isAccepted: false});
            if(!booking){
                return res.status(404).json({message: "No New booking found for this category"});
            }
            res.json(booking);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: "Server Error"});
        }

    }
    // get accepted booking by  expert
const getAcceptedBooking = async (req, res) => {
    try{
        let expertId = req.expert._id;
        let booking = await Booking.find({accepteBy: expertId, isAccepted: true}).populate('userId').select('-password, -__v, -createdAt, -updatedAt, -isVerified, -role');
        if(!booking){
            return res.status(404).json({message: "No booking found"});
        }
        res.json(booking);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
// reject booking by expert
const rejectBooking = async (req, res) => {
try{
    let expertId = req.expert._id;
    let bookingId = req.params.id || req.body.id;
    let booking =await Booking.findOne({_id: bookingId, accepteBy: expertId});
    if(!booking){
        return res.status(404).json({message: "Booking not found"});
    }
    booking.isAccepted = false;
    booking.accepteBy = null;
    await booking.save();
    res.json({message: "Booking rejected"});

}catch(err){
    console.log(err);
    res.status(500).json({message: "Server Error"});
}
}
// cancel booking by user
const cancelBooking = async (req, res) => {
    try{
         let userID = req.user._id;
            let bookingId = req.params.id || req.body.id;
            await Booking.deleteOne({_id: bookingId, userId: userID});
            res.json({message: "Booking cancelled"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
// accept booking by expert
const acceptBooking = async (req, res) => {
    try{
        let expertId = req.expert._id;
        let bookingId = req.params.id || req.body.id;
        // check if booking is already accepted by other expert

        let booking =await Booking.findOne({ isAccepted: false});
        if(!booking){
            return res.status(400).json({message: "Booking already accepted by other expert"});
        }
        let expert = await Expert.findOne({_id: expertId});
        if(!expert){
            return res.status(404).json({message: "Expert not found"});
        }

        booking.isAccepted = true;
        booking.accepteBy = expertId;
        expert.acceptedService.push(bookingId);
        expert.pendingService.push(bookingId);
        await expert.save();
        await booking.save();
        
        res.json({message: "Booking accepted"});


    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

// complete booking by expert
const completeBooking = async (req, res) => {
    try{
        let expertId = req.expert._id;
        let bookingId = req.params.id || req.body.id;
        let booking = await Booking.find({_id: bookingId, accepteBy: expertId});
        if(!booking){
            return res.status(404).json({message: "Booking not found"});
        }
        let expert = await Expert.findOne({_id: expertId});
        if(!expert){
            return res.status(404).json({message: "Expert not found"});
        }
        // remove booking from pending service
        let index = expert.pendingService.indexOf(bookingId);
        expert.pendingService.splice(index, 1);
        // add booking to completed service
        expert.completedService.push(bookingId);
        await expert.save();
        booking.status = "Completed";

        await booking.save();
        res.json({message: "Booking completed"});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}
//  get booking by user
const getBookingByUser = async (req, res) => {
    try{
        let userId = req.user._id;
        let booking= await Booking.find({userId: userId});
        if(!booking){
            return res.status(404).json({message: "No booking found"});
        }
        res.json(booking);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

// export all function
module.exports = {
    createBooking,
    paymentCompleted,
    getAllBooking,
    getBookingById,
    getBookingByCategory,
    getAcceptedBooking,
    rejectBooking,
    cancelBooking,
    acceptBooking,
    completeBooking,
    getBookingByUser
}