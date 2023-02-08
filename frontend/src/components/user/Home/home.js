import {useEffect} from 'react'
import './home.css'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from '../../../api/axios'
import image from '../../../asset/JOBOY.jpg'
import plumber from '../../../asset/plumber2 (1).jpg'
import ele from '../../../asset/ele1.jpg'
import painter from '../../../asset/Painter1.jpg'
import jwt from "jwt-decode"
import { userLoginDetails,userAllDetails } from '../../Redux/adminReducer';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Grid,
    makeStyles
} from '@mui/material'
import {margin} from '@mui/system'


function Userhome() {
    
    const details = [
        {
            name: "Plumber",
            pic: plumber,
            deiscription: " ARE YOU LOOKING FOR TRUSTED PLUMBER SERVICES NEAR YOU?"
        }, {
            name: "Electrician",
            pic: ele,
            deiscription: " ARE YOU LOOKING FOR TRUSTED ELECTRICIAN SERVICES NEAR YOU?"
        }, {
            name: "Painter",
            pic: painter,
            deiscription: " ARE YOU LOOKING FOR TRUSTED PAINTER SERVICES NEAR YOU?"
        }
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('userInfo')
        if (token) {
            const user = jwt(token)
            getUsersDetails()
            async function getUsersDetails() {
                const config = {
                    headers: {
                      Accept: 'application/json',
                      Authorization:token,
                      'Content-Type': 'application/json',
                    },
                  };
              const response = await axios.get('http://localhost:3500/users/info',config);
              const details = response.data
              dispatch(userAllDetails(details))
            }
            dispatch(userLoginDetails(user));
            if(user){
                navigate('/userHome')
            }else{
                navigate('/login')
            }
        }else{
            navigate('/login')
        }
    }, [navigate,dispatch])


    return (
        <div>
            <div className='bg-white md:flex md:flex-row flex flex-col mt-5 '>
                <div className='welcomeO'>
                    <h1 className=' font-bold text-2xl lg:text-6xl mb-4'>Welcome to Elbow Grease</h1>
                    <p className='lg:text-3xl font-bold'>We are the jack of all trade</p>
                </div>
                <div className='imagefirst mt-5 '>
                    <img className='object-contain'
                        src={image}/>
                </div>
            </div>
            <div className=''>
            
            </div>
            <div className='bg-zinc-100'>
                <h1 className='text-center text-black mus p-3'>Most Used Services</h1>
                <div className='carddiv md:flex md:flex-row md:justify-between items-center pl-5 pr-5 flex flex-col justify-center'>
                    {
                    details.map((item) => {
                        return (
                            <div className='  hover:scale-105 duration-100 p-2 '>
                                <Card  sx={
                                    {
                                        maxWidth: 300,
                                        maxHeight: 600,
                                        boxShadow:"5px 0px 10px 0px",
                                        
                                    }
                                }>
                                    <CardMedia className='h-56' component="img" alt="pic" height="140"
                                        image={
                                            item.pic
                                        }/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {
                                            item.name
                                        } </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {
                                            item.deiscription
                                        } </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={'/booking'}>
                                        <Button  variant="contained" size='large' color="success">Book</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })
                } </div>
            </div>
            
            <div className='wegO md:flex md:flex-row md:justify-around justify-center items-center flex flex-col'>
                <div className='bg-white font-bold md:text-4xl text-xl text-center items-center tracking-widest  font-mono mt-5'>
                    <h1 className='text-black'>ARE YOU A SERVICE EXPERT?</h1>
                    <h3>JOIN WORLDS LARGEST
                        <br/>
                        SERVICE NETWORK</h3>
                        <Link to="/experts/signup">
                            <Button className='m-5 p-2 bg-black' variant="contained" size='small' color="success">Register as partner</Button>
                        </Link>
                </div>
                <div className='justify-center items-center '>
                    <img className='object-contain'src={image}/>
                </div>
            </div>
        </div>
    )
}

export default Userhome
