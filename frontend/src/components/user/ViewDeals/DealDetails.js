import React,{useState,useEffect} from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import { useSelector } from "react-redux";


function DealDetails() {

  const location = useLocation()
  const id = location.state
  const user = useSelector((state) => state.admin.userToken)
  const [details,setDetails] = useState('');
  const [users,setUsers] = useState('')
  // console.log(id);
  // console.log(user);

  async function getDealDetails(){
    try {
      const config = {
        headers: {
            Accept: 'application/json',
            Authorization: user,
            'Content-Type': 'application/json'
        }
    };
      const res = await axios.get(`/users/bookingDetails/${id}`,config)
      console.log(res.data);
      setDetails(res.data)
      setUsers(res.data.userId)
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(details.userId);
  console.log(users,"THis is user");

  useEffect(()=>{
    getDealDetails()
  },[])

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
                <td>Price</td>
                <td>{`₹${details.fixedChargeStatus}`}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{details.address}</td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>{details.pincode}</td>
              </tr>
              <tr>
                <td>Service</td>
                <td>{details.category}</td>
              </tr>
              <tr>
                <td>About</td>
                <td>{details.discription}</td>
              </tr>
              <tr>
                <td>Accepted</td>
                <td>{details.isAccepted?"The expert is on the way":"Looking for expert"}</td>
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
                <td>{users.name}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{users.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{users.phone}</td>
              </tr>
             
            </MDBTableBody>
          </MDBTable>
          </div>
        </div>
    </div>
  )
}

export default DealDetails