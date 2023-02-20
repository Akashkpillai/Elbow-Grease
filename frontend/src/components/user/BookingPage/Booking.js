import {useEffect, useState} from 'react'
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    Container,
} from '@mui/material'
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userBookingDetails} from '../../Redux/adminReducer'
import axios from '../../../api/axios'
import {toast} from 'react-toastify'



function Booking() {

    const dispatch = useDispatch()
   
    const user = useSelector((state) => state.admin.userToken)


    // console.log(user);


    const [address, setAddress] = useState()
    const [pincode, setPincode] = useState()
    const [datestime, setDatetime] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState();
    const [category, setService] = useState()
    const [discription, setAbout] = useState()
    const [cat,setCat] = useState([])


    // console.log(date);

    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0);
    minTime.setDate(minTime.getDate());
    // console.log(minTime.toJSON().slice(0, 16),"MINtIME");

  const maxTime = new Date();
  maxTime.setHours(24, 0, 0, 0);
  maxTime.setDate(minTime.getDate() + 5);
    // console.log(maxTime,"MaxTime");

    const [response, setResponse] = useState()

    const value = {
        address,
        pincode,
        date,
        category,
        discription,
        time
    }
    const location = useLocation()
    const bookDetails = location.state


    const catrgory = async() =>{
        try {
          const res = await axios.get('/admin/Allcategory')
          setCat(res.data)
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(()=>{
        catrgory()
      },[])


    const submit = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: user,
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/users/booking', value, config)
            const msg = res.data.message
            dispatch(userBookingDetails(res.data.data))
            setResponse(res.data.data)
            toast.success(msg)
            payment()
        } catch (error) {
            const msg = error.response.data.message
            toast.error(msg)
        }
    }

    const payment = async () => {
        axios.post('/users/create-checkout-session', {response}).then((res) => {
            console.log(res);
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleChange = (e) => {
        e.preventDefault()
        setService(e.target.value)
    }

    const hndleDateTime = (e) =>{
        const value = e.target.value
        setDatetime(value)
        setDate(value.split('T')[0])
        setTime(value.split('T')[1]) 
}


    return (
        <>
            <div className='contact'>
                <Container>
                    <Typography margin={'1rem'}
                        gutterBottom
                        variant='h4'
                        align='center'>
                        Book Your expert
                    </Typography>
                    <Card style={
                        {
                            maxWidth: 700,
                            margin: '0 auto',
                            padding: '20px 5px',
                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
                        }
                    }>
                        <CardContent>
                            <form onSubmit={submit}>
                                <Grid container
                                    spacing={1}>

                                    <Grid xs={12}
                                        item>
                                        <TextField multiline
                                            rows={5}
                                            placeholder='Address'
                                            type='text'
                                            value={address}
                                            onChange={
                                                (e) => {
                                                    setAddress(e.target.value)
                                                }
                                            }
                                            variant='outlined'
                                            fullWidth
                                            required/>
                                    </Grid>
                                <Grid xs={12}
                                    item>
                                    <TextField type="number"
                                        value={pincode}
                                        onChange={
                                            (e) => {
                                                setPincode(e.target.value)
                                            }
                                        }
                                        placeholder='Pincode'
                                        variant='outlined'
                                        fullWidth
                                        required/>
                                </Grid>
                            <Grid xs={12}
                                item>
                                <TextField type='datetime-local'
                                    value={datestime}
                                    onChange={
                                       hndleDateTime
                                    }
                                    variant='outlined'
                                    fullWidth
                                       required
                                       InputLabelProps={{
                                        shrink: true,
                                      }}
                                       inputProps={{
                                         min: minTime.toJSON().slice(0, 16),
                                         max: maxTime.toJSON().slice(0, 16),
                                      }} />

                            </Grid>
                        <Grid sm={12}
                            item>
                            <Typography variant='body2' gutterBottom>
                                Service
                            </Typography>
                            <select defaultValue={"Default"} onChange={handleChange}
                                className='w-full'
                                style={
                                    {border: "solid 1px grey"}
                            }>
                                <option disabled value='Default'>Select your option</option>
                                {
                                cat?.map((ser) => {
                                    return (
                                        <option key={ser._id} value={
                                            ser.category
                                        }>
                                            {
                                            ser.category
                                        }</option>
                                    )
                                })
                            } </select>
                        </Grid>
                        <Grid xs={12}
                            item>
                            <TextField multiline
                                rows={5}
                                placeholder='Discription'
                                type='text'
                                value={discription}
                                onChange={
                                    (e) => {
                                        setAbout(e.target.value)
                                    }
                                }
                                variant='outlined'
                                fullWidth/>
                        </Grid>
                    <Grid xs={12}
                        sm={3}
                        item>
                        <Button type='submit' variant='contained' fullWidth color='success'>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    </Card>
</Container></div></>
    )
}

export default Booking
