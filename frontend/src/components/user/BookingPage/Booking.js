import React from 'react'
import './booking.css'
import {
    MDBCard,
    MDBCardBody,
  } from 'mdb-react-ui-kit';
import { Button,Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const users =[{name:"Akash"},{name:"Akhil"},{name:"Abhi"},{name:"Devan"},{name:"Navas"}]

function Booking() {
  return (
    <>
    <div className='maindivbook'> 
        <div className='proceed'>
    <MDBCard className='cardbook' style={{backgroundColor:'whitesmoke',width:'50%',boxShadow:'0px 3px 0px 5px'}}>
      <MDBCardBody>Please Proceed Booking.</MDBCardBody>
      <Link to={''}>
      <Button variant="contained" size='small' color="success">Proceed</Button>
      </Link>
    </MDBCard>
        </div>
        <div className='booktext'>
            <h1>TERM AND CONDITION</h1>
            <p>1.Material and spares will be charged extra. Drainage cleaning will be done only on quotation basis</p>
            <p>2.An amount of Rs.200 will be charged in case the customer decides not to proceed with the service, after inspection is done and a quote given. An additional Rs. 150 will be charged for work done after 8 PM till 7 AM and on public holidays.</p>
            <p>3.Our service partner will help you with a quotation in case of long hour work schedules. Please confirm the quotation before initiating work to avoid any conflict on service completion.</p>
        </div>
        <div className='review'>
           <h1>CUSTOMER REVIEWS</h1>
           <div className='ratingflex flex-wrap'>
            {
              users.map((item)=>{
            return(
            <div className='rating'>
              <p className=''>{item.name}</p>
              <Rating name="read-only" value={4} readOnly /> 
            </div>
                  )
                })
              }
              </div>
        </div>
    </div>
    </>
  )
}

export default Booking