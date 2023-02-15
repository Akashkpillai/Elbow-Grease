import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {Card, Grid} from 'antd';
import axios from '../../../api/axios';
import './viewAll.css'
import Navbar from '../AdminNav/AdminNav.js'


function Deals() {

    const token = useSelector((state) => state.admin.expertDetails)
    const navigate = useNavigate()
    const [details, setDetails] = useState()
    const [nodata, setnodata] = useState('')


    async function getDetails() {
        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                  Accept: 'application/json',
                  Authorization:token,
                  'Content-Type': 'application/json',
                },
              };
            const res = await axios.get("/admin/booking-page",config)
            setDetails(res.data);
        } catch (error) {
            console.log(error);
        }
    }
  

    useEffect(() => {
        getDetails()
    }, [])

    // const acceptDeal = async () => {}


    return (
        <>
        <Navbar/>
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
    <h1 className='font-bold'>{`Status : ${booking.status}`}</h1>
    <p>{`Date : ${booking.date}`}</p>
    <p>{`Time : ${booking.time}`}</p>
  </div>
    <div className='buttonDeal'>
        <button onClick={()=>{navigate('/admin/deal-alldetails',{state:booking._id})}} type='submit' className='bg-black text-white hover:bg-violet-600'>View</button>
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
  </>

    )
}

export default Deals
