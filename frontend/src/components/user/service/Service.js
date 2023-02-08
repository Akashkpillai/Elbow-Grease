import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';
import './service.css'
import image from '../../../asset/male-electrician-works-switchboard-with-electrical-connecting-cable.jpg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';


function Service() {

  const [service,setService] = useState();

  useEffect(()=>{
   getAllServices();
  },[service])
    
  async function getAllServices() {
    const response = await axios.get('/users/services');
    setService(response.data.data);
  }
   
      
  return (
 <>
      <div className="relative h-full" >
        <img className="w-[100%] h-[88vh] " src={image} alt="" />

        <h1 className="absolute text-center text-2xl text-black bottom-4 left-1/2 -translate-x-1/2 pb-10 w-full pt-8 bg-white/[.55] font-semibold">
        HOW DO YOU FIND EXPERT IN LOCATION IN AN URGENCY? TRUST ELBOW GREASE TO FIND THE RIGHT EXPERT FOR YOU
        </h1>
      </div>
      {
        service?.map((item)=>{
            return(
      <div className='bg-white flex flex-col justify-center items-center services mb-6'>
      <MDBCard className='sercard ' style={{ maxWidth: '940px', }}>
      <MDBRow className=''>
        <MDBCol className='mt-6'>
          <MDBCardImage src={item.image} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{item.title}</MDBCardTitle>
            <MDBCardText>
              {item.deiscription}
            </MDBCardText>
            <MDBCardText style={{color:'greenyellow'}}>
             Payment:{item.price}
            </MDBCardText>
            <MDBCardText style={{color:'red'}}>
              <small className='note'>Note:{item.note}</small>
            </MDBCardText>
            <Link to={'/booking'}>
            <Button variant="contained" size='small' color="success">
                Book now!
            </Button>
            </Link>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    </div>
            )
        })
      }
</>
  )
}


export default Service