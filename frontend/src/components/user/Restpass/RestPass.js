import {useState} from 'react'
import './restpass.css'
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import {useNavigate,useParams} from 'react-router-dom'
import axios from '../../../api/axios'
// import {showErrMsg} from '../../util/notifications/Notification'




function ResetPass() {
    const {token} = useParams()
    const navigate = useNavigate();

    const [password,setPassword] = useState('');
    const [validation,setValidation] = useState('')


    const handleChangeInput = e =>{
        setPassword(e.target.value)
        console.log(password);
       }

    const submitPass = async(e) =>{
        e.preventDefault()
        try {
           const res = await axios.post('/users/reset',{password},
           {
            headers:{Authorization:token}
           }
           )
           console.log(res);
           const msg = res.data.msg
           setValidation(msg)
        } catch (err) {
            const msg = err.response.data.msg
            setValidation(msg)
        }
       }
    
    
    

    return (<div className='forgotpass'>
        <Card style={
            {
                maxWidth: 550,
                margin: '8rem auto',
                padding: '20px 5px',
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
            }
        }>
            <h1 className='text-center text-red-600'>{validation}</h1>
            <Typography gutterBottom align='center' fontSize='30px' variant='body2' color='green' margin='10px 0px 0px 0px' component='h2'>Enter new password</Typography>
            <CardContent>
                <form onSubmit={submitPass}>
                <Grid>
                    <Grid>
                        <TextField type='text' onChange={handleChangeInput} value={password} placeholder='password' variant='outlined' fullWidth required/>
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

export default ResetPass
