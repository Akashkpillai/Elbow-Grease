import React from 'react'
import Footer from '../../components/user/Footer/Footer'
import Home from '../../components/user/Home/home'
import UserNavbar from '../../components/user/Navbar/Navbar'

function Userhome() {
  return (
    <div>
      <UserNavbar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default Userhome