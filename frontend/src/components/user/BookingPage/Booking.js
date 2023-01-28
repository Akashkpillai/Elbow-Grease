import {useState} from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography,Container, MenuItem,Select} from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Booking() {

  const catrgory = useSelector((state) => state.admin.category);


const [address,setAddress] = useState()
const [pincode,setPincode] = useState()
const [datetime,setDatetime] = useState()
const [service,setService] = useState()
const [about,setAbout] = useState()


  const handleChange= (e)=>{
    e.preventDefault()
    setService(e.target.value)
  }

  return (
    <>
    <div className='contact'>
    <Container>
      <Typography margin={'1rem'} gutterBottom variant='h4' align='center'>
        Book Your expert
      </Typography>
        <Card style={{maxWidth:700,margin:'0 auto',padding:'20px 5px',boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} >
        <CardContent>
          <form>
          <Grid container spacing={1}>
           
            <Grid xs={12} item>
              <TextField multiline rows={5} placeholder='Address'   type='text' value={address} onChange={(e)=>{setAddress(e.target.value)}} variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12}  item>
              <TextField type="number" value={pincode}   onChange={(e)=>{setPincode(e.target.value)}} placeholder='Pincode' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12}  item>
              <TextField type='datetime-local'   value={datetime} onChange={(e)=>{setDatetime(e.target.value)}} variant='outlined' fullWidth required/>       
            </Grid>
            <Grid sm={12} item>
            <Typography variant='body2' gutterBottom >
              Service
            </Typography>
            <select onChange={handleChange}  className='w-full' style={{border:"solid 1px grey"}} >
              <option disabled selected>Select your option</option>
            {
              catrgory.map((ser)=>{
                return(
                     <option value={ser.category} >{ser.category}</option>
                     )
                    })  
                  }
                  </select>
            </Grid>
            <Grid xs={12} item>
              <TextField multiline rows={5} placeholder='Discription'   type='text' value={about} onChange={(e)=>{setAbout(e.target.value)}} variant='outlined' fullWidth />       
            </Grid>
            <Grid xs={12} sm={3} item >
              <Button type='submit'  variant='contained' fullWidth color='success'>Submit</Button>       
            </Grid>
          </Grid>
          </form>
        </CardContent>
      </Card>
  </Container>
    </div>
    </>
  )
}

export default Booking




