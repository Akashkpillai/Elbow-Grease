import {useState} from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography,Container, MenuItem,Select, Link} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';
import axios from '../../../api/axios'
import {toast} from 'react-toastify' 
import { blue } from '@mui/material/colors';



function Booking() {

  const catrgory = useSelector((state) => state.admin.category);
  const dispach = useDispatch()

//   console.log();

const [address,setAddress] = useState()
const [name,setName] = useState()
const [email,setEmail] = useState()
const [phone,setPhone] = useState()
const [city,setCity] = useState()
const [category,setService] = useState()
const [newPassword,setNewPassword] = useState()
const [conPassword,setConPassword] = useState()
const [password,setPassword] = useState();

const submit = async(e)=>{
  
}

// console.log(value,"This is value");

  const handleChange= (e)=>{
    e.preventDefault()
    setService(e.target.value)
  }

  return (
    <>
    <div className='contact'>
    <Container>
      <Typography margin={'1rem'} gutterBottom variant='h4' align='center'>
        Expert Sign-up
      </Typography>
        <Card style={{maxWidth:700,margin:'0 auto',padding:'20px 5px',boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} >
        <CardContent>
          <form onSubmit={submit}>
          <Grid container spacing={3}>
          <Grid xs={6}  item>
              <TextField type="text"   placeholder='name' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={6}  item>
              <TextField type="number"  placeholder='number' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={6}  item>
              <TextField type="email"    placeholder='email' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={6}  item>
              <TextField type="text"    placeholder='Service location' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12}  item>
              <TextField type='text' multiline placeholder='address'  variant='outlined' fullWidth required/>       
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
            <Grid xs={6} item>
              <TextField   placeholder='Password'   type='password'  variant='outlined' fullWidth />       
            </Grid>
            <Grid xs={6} item>
              <TextField  placeholder='Confirm password'   type='password'  variant='outlined' fullWidth />       
            </Grid>
            <Grid xs={12} sm={3} item >
              <Button type='submit'  variant='contained' fullWidth color='success'>Submit</Button>       
            </Grid>
            <Grid xs={12} sm={3} item >
            <Link  underline='hover' href="#">Login</Link>    
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




