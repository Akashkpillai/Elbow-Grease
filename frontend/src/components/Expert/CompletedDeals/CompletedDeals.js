import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {Card, Grid} from 'antd';
import axios from '../../../api/axios';
import './accepted.css'
import ExNavbar from '../Navbar/Navbar'

function Deals() {

    const token = useSelector((state) => state.admin.expertDetails)
    const navigate = useNavigate()
    const [details, setDetails] = useState()
    const [nodata, setnodata] = useState('')


    async function getDetails() {
        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.get("/expert/accepted-booking", config)
            console.log(res.data)
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
        <div className='container exdeal-main'>
            <ExNavbar/> {
            details?.length !=0 ? details ?. map((booking) => {
                return (
                    <Card className='md:w-8/12 w-8/12'
                        style={
                            {
                                marginTop: 20,
                                backgroundColor: "lightpink"
                            }
                    }>
                        <div className='excardDeal'>
                            <div className='exDealtext'>
                                <h1 className='font-bold'>
                                    {
                                    booking.category
                                }</h1>
                                <h4>{
                                    `Address : ${
                                        booking.address
                                    }`
                                }</h4>
                                <p>{
                                    `Date : ${
                                        booking.date
                                    }`
                                }</p>
                                <p>{
                                    `Time : ${
                                        booking.time
                                    }`
                                }</p>
                            </div>
                            <div className='exbuttonDeal'>
                                <button onClick={
                                        () => {
                                            navigate('/experts/accepted-deal-details', {state: booking._id})
                                        }
                                    }
                                    type='submit'
                                    className='bg-black text-white hover:bg-violet-600 mr-3'>View</button>
                                    
                                {/* <button onClick={acceptDeal} type='submit' className='bg-black text-white hover:bg-violet-600'>Accept</button> */} </div>
                        </div>
                    </Card>
                )
            }) : <div className='flex h-48  justify-center items-end text-center'>
                <h3 className='text-4xl font-bold'>
                    No booking found
                </h3>
            </div>
        } </div>
    )
}

export default Deals
