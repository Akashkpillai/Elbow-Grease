import React from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography} from '@mui/material'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import './contact.css'

function ContactForm() {
  
  return (
    <div className='contact'>
      <Typography margin={'1rem'} gutterBottom variant='h4' align='center'>
        Contact Us
      </Typography>
        <Card style={{maxWidth:550,margin:'0 auto',padding:'20px 5px',boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"}} >
        <CardContent>
          <Typography gutterBottom variant='body2' color='GrayText' component='p'>Fill the form and our team will contact you within 24 hours.</Typography>
          <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField placeholder='Enter your first name' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField  placeholder='Enter your second name' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12}item>
              <TextField type='email' placeholder='Email' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12} item>
              <TextField type="number" placeholder='Contact number' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12} item>
              <TextField multiline rows={7} placeholder='Message' variant='outlined' fullWidth required/>       
            </Grid>
            <Grid xs={12} item>
              <Button type='submit' variant='contained' fullWidth color='success'>Submit</Button>       
            </Grid>
            <Grid xs={12} item style={{display:'flex',margin:'10px 0px'}}>
              <Typography variant='body2' color='GrayText'  style={{margin:'0px 30px 0px 0px'}}><PhoneRoundedIcon/>047-92-43</Typography>
              <FacebookTwoToneIcon/> 
              <Typography variant='body2' color='GrayText'  style={{margin:'0px 0px 0px 30px'}}> <EmailRoundedIcon/>elbowgrease@gmail.com</Typography>    
            </Grid>
          </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactForm