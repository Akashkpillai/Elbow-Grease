import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'

function AdminHome() {
    const navigate=useNavigate()
    const ad = localStorage.getItem('adminToken')
    const name = jwt(ad)
    useEffect(() => {
        const token=localStorage.getItem('adminToken')
        if(token){
          const admin=jwt(token)
          console.log(admin);
          if(admin){
            navigate('/admin/home')
          }else{
            navigate('/admin')
          }
        }else{
          navigate('/admin')
        } 
      }, [navigate])
    //  console.log(admin);
  return (
    <div>{ad?`wlecome ${name.email}`:"Please Login"}</div>
  )
}

export default AdminHome