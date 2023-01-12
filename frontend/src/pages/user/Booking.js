import React from 'react'
import  UserNavbar from '../../components/user/Navbar/Navbar'
import Footer from '../../components/user/Footer/Footer'
import Booking from '../../components/user/BookingPage/Booking'

function Book() {
  return (
    <div>
        <UserNavbar/>
        <Booking/>
        <Footer/>
    </div>

  )
}

export default Book