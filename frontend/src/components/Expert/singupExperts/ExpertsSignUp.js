import {useState} from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography,Container, MenuItem,Select, Link} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';
import {useFormik} from 'formik'
import { signupSchema } from './signupSchema';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from '../../../api/axios';
import ExNavbar from '../../../pages/Experts/ExNavbar';



function Booking() {

  const catrgory = useSelector((state) => state.admin.category);
  const navigate = useNavigate();
const initialValues = {
  name:"",
  email:"",
  phone:"",
  city:"",
  category:"",
  address:'',
  newPassword:"",
  conPassword:""
}

 const {values,errors,touched,handleChange,handleSubmit,handleBlur} = useFormik({
  initialValues:initialValues,
  validationSchema:signupSchema,
  onSubmit:async(values,action)=>{
    try {
      console.log(values,"Hi poopi");
    const res = await axios.post('/expert/signup',values)
    console.log(res,"myre");
    toast.success(res.data.message)
    action.resetForm()
    navigate('/experts/login')
    } catch (error) {
      console.log(error);
      toast.error("This phone number is already exist")
    }
  }
})


  return (
    <>
    <div className='contact'>
    {/* <ExNavbar/> */}
    <Container>
      <Typography margin={'1rem'} gutterBottom variant='h4' align='center'>
        Expert Sign-up
      </Typography>
        <Card style={{maxWidth:700,margin:'0 auto',padding:'20px 5px',boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} >
        <CardContent>
          <form  onSubmit={handleSubmit}>
          <Grid container spacing={3}>
          <Grid xs={6}  item>
              <TextField type="text" onChange={handleChange} onBlur={handleBlur} value={values.name} name='name' id='name'  placeholder='name' variant='outlined' fullWidth required/>
              {<p className='form-error text-red-600'>{errors.name&&touched.name?(errors.name):null}</p>}       
            </Grid>
            <Grid xs={6}  item>
              <TextField type="number"  onChange={handleChange} onBlur={handleBlur} value={values.phone} name='phone' id='phone'  placeholder='number' variant='outlined' fullWidth required/>
              {<p className='form-error text-red-600'>{errors.phone&&touched.phone?(errors.phone):null}</p>}              
            </Grid>
            <Grid xs={6}  item>
              <TextField type="email"  onChange={handleChange} onBlur={handleBlur} value={values.email} name='email' id='email'    placeholder='email' variant='outlined' fullWidth required/>   
              {<p className='form-error text-red-600'>{errors.email&&touched.email?(errors.email):null}</p>}           
            </Grid>
            <Grid xs={6}  item>
              <TextField type="text"  onChange={handleChange} onBlur={handleBlur} value={values.city} name='city'  id='city' placeholder='Service location' variant='outlined' fullWidth required/> 
              {<p className='form-error text-red-600'>{errors.city&&touched.city?(errors.city):null}</p>}             
            </Grid>
            <Grid xs={12}  item>
              
              <TextField type='text'  onChange={handleChange} onBlur={handleBlur} value={values.address} name='address' id='address' multiline placeholder='address'  variant='outlined' fullWidth required/>
              {<p className='form-error text-red-600'>{errors.address&&touched.address?(errors.address):null}</p>}              
            </Grid>
            <Grid sm={12} item>
            <Typography variant='body2' gutterBottom >
            {<p className='form-error text-red-600'>{errors.category&&touched.category?(errors.category):null}</p>}       
              Service
            </Typography>
            <select  onChange={handleChange} onBlur={handleBlur} value={values.value} name='category'  className='w-full' style={{border:"solid 1px grey"}} >
              <option disabled selected>Select your option</option>
            {
              catrgory.map((ser)=>{
                return(
                     <option name='category'  value={ser.category} >{ser.category}</option>
                     )
                    })  
                  }
                  </select>
            </Grid>
            <Grid xs={6} item>
              <TextField   placeholder='Password'  onChange={handleChange} onBlur={handleBlur} value={values.newPassword} name='newPassword' type='password'  variant='outlined' fullWidth />       
            {<p className='form-error text-red-600'>{errors.newPasswor&&touched.newPassword?(errors.newPassword):null}</p>}       
            </Grid>
            <Grid xs={6} item>
              <TextField  placeholder='Confirm password'  onChange={handleChange} onBlur={handleBlur} value={values.conPassword} name='conPassword'   type='password'  variant='outlined' fullWidth /> 
              {<p className='form-error text-red-600'>{errors.conPassword&&touched.conPassword?(errors.conPassword):null}</p>}             
            </Grid>
            <Grid xs={12} sm={3} item >
              <Button type='submit'  variant='contained' fullWidth color='success'>Submit</Button>       
            </Grid>
            <Grid xs={12} sm={3} item >
            <Link  underline='hover' href="/experts/login">Login</Link>    
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




