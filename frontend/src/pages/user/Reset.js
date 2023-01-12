import React from 'react'
import  UserNavbar from '../../components/user/Navbar/Navbar'
import Footer from '../../components/user/Footer/Footer'
import ResetPass from '../../components/user/Restpass/RestPass'

function Reset() {
  return (
    <div>
        <UserNavbar/>
            <ResetPass/>
        <Footer/>
    </div>
  )
}

export default Reset