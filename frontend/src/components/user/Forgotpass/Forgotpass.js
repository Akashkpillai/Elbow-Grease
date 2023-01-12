import {useState} from 'react'
import './forgot.css'
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from '../../../api/axios'
import {showErrMsg} from '../../util/notifications/Notification'




function Forgotpass() {

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [validation,setValidation] = useState('')


    const handleChangeInput = e =>{
        setEmail(e.target.value)
       }

    const submitMail = async(e) =>{
        e.preventDefault()
        try {
            const res = await axios.post('/users/forgot',{email})
            const msg = res.data.msg
            // navigate('/reset_password')
            setValidation(msg)    
        } catch (err) {
            // console.log("error",err);
            const msg = err.response.data.msg
            setValidation(msg)
        }
       }
    
    
    

    return (
    <div className='forgotpass'>
        <Card style={
            {
                maxWidth: 550,
                margin: '8rem auto',
                padding: '20px 5px',
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
            }
        }>
            <h1 className='text-center text-red-600'>{validation}</h1>
            <Typography gutterBottom align='center' fontSize='30px' variant='body2' color='green' margin='10px 0px 0px 0px' component='h2'>Enter your Email</Typography>
            <CardContent>
                <form onSubmit={submitMail}>
                <Grid>
                    <Grid>
                        <TextField type='email' onChange={handleChangeInput} value={email} placeholder='Email' variant='outlined' fullWidth required/>
                    </Grid>
                    <Grid xs={12} item>
                        <Button type='submit' variant='contained' fullWidth color='success'>Submit</Button>
                    </Grid>
                </Grid>
                </form>
            </CardContent>
        </Card>
    </div>)
}

export default Forgotpass
