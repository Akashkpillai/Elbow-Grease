import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'
import axios from '../../../api/axios'

function AdminHome() {

  const Admintoken = useSelector((state) => state.admin.adminDetails)
  // console.log(token);

 const [user,setUser] = useState()
 const [expert,setExpert] = useState()
 const [deal,setDeal] = useState()

    const navigate=useNavigate()
    useEffect(() => {
        const token=localStorage.getItem('adminToken')
        if(token){
          const admin=jwt(token)
          if(admin){
            navigate('/admin/home')
          }else{
            navigate('/admin')
          }
        }else{
          navigate('/admin')
        } 
      }, [])

      const config = {
        headers: {
            Accept: 'application/json',
            Authorization: Admintoken,
            'Content-Type': 'application/json'
        }
      }
 
      const getUserCount = async() =>{
        try {
          const res = await axios.get('/admin/getUserCount',config)
          setUser(res.data.count)
        } catch (error) {
          console.log(error);
        }
      }
      const getExpertCount = async() =>{
        try {
          const res = await axios.get('/admin/getExpertCount',config)
          setExpert(res.data.count)
        } catch (error) {
          console.log(error);
        }
      }
      const getDealCount = async() =>{
        try {
          const res = await axios.get('/admin/getDealCount',config)
          setDeal(res.data.count)
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
       getUserCount()
       getExpertCount()
       getDealCount()
      })
      

  return (
    <div className="m-12">
      <div className="flex  justify-around  flex-wrap ">
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl font-bold text-center">
              {user?user:0}
            </p>
            <p className="text-lg  font-semibold">Users</p>
          </div>
        </div>
        <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
          <div className="flex-row">
            <p className="text-3xl  font-bold text-center">
              {expert?expert:0}
            </p>
            <p className="text-lg  font-semibold">Experts</p>
          </div>
        </div>
        <Link to={'/admin/booking'}>
          <div className=" h-24 flex items-center justify-center bg-sky-500/75 w-72 rounded-xl mt-6 px-4 shadow-lg">
            <div className="flex-row">
              <p className="text-3xl  font-bold text-center">
                {deal?deal:0}
              </p>
              <p className="text-lg  font-semibold">Deals</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminHome