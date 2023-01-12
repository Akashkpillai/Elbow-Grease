import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia,Typography } from '@mui/material'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
  } from 'mdb-react-ui-kit';
import './service.css'
import image from '../../../asset/male-electrician-works-switchboard-with-electrical-connecting-cable.jpg'
import plumber from '../../../asset/plumber2 (1).jpg'
import ele from '../../../asset/ele1.jpg'
import painter from '../../../asset/Painter1.jpg'
import { Link } from 'react-router-dom';


function Service() {
    const details = [
        {
            name: "Plumber",
            pic:plumber ,
            deiscription: " ARE YOU LOOKING FOR TRUSTED PLUMBER SERVICES NEAR YOU?",
            price:"₹300",
            note:"only mentioning the visiting charge"
        }, {
            name: "Electrician",
            pic: ele,
            deiscription: " ARE YOU LOOKING FOR TRUSTED ELECTRICIAN SERVICES NEAR YOU?",
            price:"₹300",
            note:"only mentioning the visiting charge"
            
        }, {
            name: "Painter",
            pic: painter,
            deiscription: " ARE YOU LOOKING FOR TRUSTED PAINTER SERVICES NEAR YOU?",
            price:"₹300",
            note:"only mentioning the visiting charge"
        }
    ]
  return (
 <>
      <div className="relative h-full" >
        <img className="w-[100%] h-[88vh] " src={image} alt="" />

        <h1 className="absolute text-center text-2xl text-black bottom-4 left-1/2 -translate-x-1/2 pb-10 w-full pt-8 bg-white/[.55] font-semibold">
        HOW DO YOU FIND EXPERT IN LOCATION IN AN URGENCY? TRUST ELBOW GREASE TO FIND THE RIGHT EXPERT FOR YOU
        </h1>
      </div>
      {
        details.map((item)=>{
            return(
      <div className='bg-white services mb-6'>
      <MDBCard className='sercard ' style={{ maxWidth: '940px', }}>
      <MDBRow className=''>
        <MDBCol md='4'>
          <MDBCardImage src={item.pic} alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>{item.name}</MDBCardTitle>
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