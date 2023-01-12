import React, { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import LOGO from '../../../asset/elbow-grease-low-resolution-logo-black-on-transparent-background.png'
import {useSelector,useDispatch} from 'react-redux'
import jwt from "jwt-decode"
import {useNavigate} from 'react-router-dom'
import { clearUserLoginDetails,clearUserToken } from '../../Redux/adminReducer';



const Navbar = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const details = localStorage.getItem('userInfo')
  const logout=()=>{
    localStorage.clear('userInfo')
    dispatch(clearUserToken());
    dispatch(clearUserLoginDetails());
    navigate('/login')
}

  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <nav className='navbar'>
        <Link to="/">
          <img className="logo" style={{width:"30vh"}} src={LOGO} alt="img" />
        </Link>
          {/* <h1>Login</h1> */}
        <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
          <Link to='/' className='home'>
            <li>Home</li>
          </Link>
          <Link to='/services' className='services'>
            <li>Services</li>
          </Link>
          <Link to='/contact' className='contact'>
            <li>Contact</li>
          </Link>
          <Link to='/deal' className='deal'>
            <li>Deal</li>
          </Link>
          {
            details?
            <Link to='/login'>
            <li onClick={logout}>Logout</li>
            </Link>:
            <Link to='/login' className='profile'>
            <li >Login</li>
            </Link>
         }

        </ul>
        {/* 
        whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
        */}
        <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross className="-mt-5 " /> : <FaBars className="-mt-5 " />}
        </button>
      </nav>
    </>
  )
}
export default Navbar
