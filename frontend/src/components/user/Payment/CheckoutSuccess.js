import {useEffect, useState} from 'react'
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import axios from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import {clearBookingDetails} from '../../Redux/adminReducer'



function CheckoutSuccess() {
    
    const dispatch = useDispatch()
    const [id,setId] = useState();
    const bookId = useSelector((state)=>state.admin.bookingDetails._id)
   
    useEffect(() => {
        setId(bookId)
        axios.get(`/users/payment/${id}`)
        dispatch(clearBookingDetails())
    }, [])
    

  return (
    <div>
         <div>
      <div className="h-screen flex justify-center justify-items-center items-center">
        <Result
          status="success"
          title="Successfully Completed Payment"
          subTitle="You are ready to go! Click the button below"
          extra={[
            <Link to={'/userHome'}>
              <Button key="console">Go To Website</Button>
            </Link>, // <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>
    </div>
    </div>
  )
}

export default CheckoutSuccess