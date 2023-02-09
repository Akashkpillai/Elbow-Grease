import React, {useState, useEffect} from 'react'
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import {MDBCarousel, MDBCarouselItem} from "mdb-react-ui-kit";
import {useLocation} from 'react-router-dom';
import axios from '../../../api/axios';
import {useSelector} from "react-redux";
import ExNavbar from '../Navbar/Navbar'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function DealDetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const id = location.state
    const user = useSelector((state) => state.admin.expertDetails)
    const [details, setDetails] = useState('');
    const [users, setUsers] = useState('')
    console.log(user, "this is user");
    console.log(id, "THis is id")
    async function getDealDetails() {
        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: user,
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.get(`/expert/bookingDetails/${id}`, config)
            setDetails(res.data)
            setUsers(res.data.userId)
        } catch (error) {
            console.log(error);
        }
    }
    const bookId = details._id
    console.log(bookId, "poo")

    const completedBooking = async () => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: user
            }
            const res = await axios.get(`/expert/completebooking/${id}`,{headers: headers})
            navigate('/experts/dashboard')
            toast.success(res.data.message)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const rejectBooking = async () => {
        try {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: user
            }
            const res = await axios.post(`/expert/rejectbooking/${id}`,{data:''},{headers: headers})
            navigate('/experts/dashboard')
            toast.success(res.data.message)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDealDetails()
    }, [])

    return (
        <div>
            <ExNavbar/>
            <div className="spec-table w-6/12 m-auto mt-4">
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th scope="col">Booking</th>
                            <th scope="col">Details</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                            <td>Address</td>
                            <td>{
                                details.address
                            }</td>
                        </tr>
                        <tr>
                            <td>Pincode</td>
                            <td>{
                                details.pincode
                            }</td>
                        </tr>
                        <tr>
                            <td>Service</td>
                            <td>{
                                details.category
                            }</td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td>{
                                details.discription
                            }</td>
                        </tr>

                    </MDBTableBody>
                </MDBTable>
                <div className='mt-4'>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Details</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>Name</td>
                                <td>{
                                    users.name
                                }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{
                                    users.email
                                }</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{
                                    users.phone
                                }</td>
                            </tr>

                            <div className='exbuttonDeal'>
                               
                                <button onClick={completedBooking}
                                    type='submit'
                                    className='bg-black text-white hover:bg-violet-600 mr-3'>Completed</button>
                                     <button onClick={rejectBooking}
                                    type='submit'
                                    className='bg-black text-white hover:bg-violet-600 mr-3'>Reject</button>
                            </div>

                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        </div>
    )
}

export default DealDetails
