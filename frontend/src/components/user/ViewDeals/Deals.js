import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { Card, Grid } from 'antd';
import axios from '../../../api/axios';
import './deals.css'
import {useDispatch} from 'react-redux';
import {userBookingDetails} from '../../Redux/adminReducer'

function Deals() {

    const token = useSelector((state) => state.admin.userToken)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [details,setDetails] = useState()


    async function getDetails(){
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.get("/users/booking",config)
        // console.log(res.data);
        setDetails(res.data);
    }

    useEffect(()=>{
      getDetails()
    },[])



  return (
      <div className='container  deal-main'>
        {details?.length != 0 ?  details?.map((booking)=>{
        return(
            
        <Card className='md:w-8/12 w-12/12'
    style={{
      marginTop:20,
      backgroundColor:"wheat"
    }}
  > 
  <div  className='cardDeal'>
  <div className='Dealtext'>
    <h1 className='font-bold'>{booking.category}</h1>
    <h4>{`Status : ${booking.status}`}</h4>
    <p>{`Date : ${booking.date}`}</p>
    <p>{`Time : ${booking.time}`}</p>
  </div>
    <div className='buttonDeal'>
      {booking.fixedChargeStatus === "pending"?
        <button onClick={()=>{
          dispatch(userBookingDetails(booking))
          axios.post('/users/create-checkout-session').then((res) => {
            console.log(res);
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => {
            console.log(err);
        })
        }} type='submit' className='bg-green-500 text-white hover:bg-violet-600'>Proceed Payment</button>:
        <button onClick={()=>{navigate('/deal-deatails',{state:booking._id})}} type='submit' className='bg-black text-white hover:bg-violet-600'>View</button>
      }
        
    </div>
    </div>
  </Card>
 
      )}):<div className='flex h-48  justify-center items-end text-center'>
      <h3 className='text-4xl font-bold'>
          No booking found
      </h3>
  </div>
        }
  </div>
  )
}

export default Deals