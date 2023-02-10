import React, {useState, useEffect} from 'react'
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import {MDBCarousel, MDBCarouselItem} from "mdb-react-ui-kit";
import {useLocation} from 'react-router-dom';
import axios from '../../../api/axios';
import {useSelector} from "react-redux";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';


function DealDetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const id = location.state
    const [details, setDetails] = useState('');
    const [users, setUsers] = useState('')
    const [expert, setExpert] = useState('')
    async function getDealDetails() {
        try {

            const res = await axios.get(`/admin/booking-details/${id}`)
            setDetails(res.data)
            setUsers(res.data.userId)
            setExpert(res.data.accepteBy)
        } catch (error) {
            console.log(error);
        }
    }
    const bookId = details._id

    useEffect(() => {
        getDealDetails()
    }, [])

    const PrintDetails = () =>{
        window.print()
    }

    return (
        <div>
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
                        <tr>
                            <td>Payment</td>
                            <td>{
                                details.fixedChargeStatus
                            }</td>
                        </tr>
                       

                    </MDBTableBody>
                </MDBTable>
                <div className='mt-3'>
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

                        </MDBTableBody>
                    </MDBTable>
                </div>
                <div className='mt-3'>
                    { expert ? <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">Expert</th>
                                <th scope="col">Details</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>Name</td>
                                <td>{
                                    expert.name
                                }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{
                                    expert.phone
                                }</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{
                                    expert.address
                                }</td>
                            </tr>
                            {/* <div>
                        <button onClick={PrintDetails}
                            type='submit'
                            className='bg-black text-white hover:bg-violet-600 mr-3'>Print
                        </button>
                        </div> */}

                        </MDBTableBody>
                    </MDBTable>: '' }
                    <div>
                        <button onClick={PrintDetails}
                            type='submit'
                            className='bg-black text-white hover:bg-violet-600 mr-3'>Print
                        </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default DealDetails
