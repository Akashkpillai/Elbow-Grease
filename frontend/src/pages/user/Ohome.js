import React from 'react'
import Footer from '../../components/user/Footer/Footer'
import OHome from '../../components/user/OHome/Ohome'
import UserNavbar from '../../components/user/Navbar/Navbar'

function OPhome() {
  return (
    <div>
      <UserNavbar/>
      <OHome/>
      <Footer/>
    </div>
  )
}

export default OPhome