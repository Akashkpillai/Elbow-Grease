import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './expert.css'
import {showErrMsg, showSuccessMsg} from "../../util/notifications/Notification"
import axios from '../../../api/axios'
import {expertLoginDetails} from '../../Redux/adminReducer'
import { useFormik } from 'formik'
import { loginSchema } from './expertLoginSchema'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const initialState = {
    phone: '',
    password: '',
}

function ExpertLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [err,setErr] = useState()

    const {values,errors,handleSubmit,handleReset,handleChange,handleBlur,touched} = useFormik({
        initialValues:initialState,
        validationSchema:loginSchema,
        onSubmit:async(values,action) =>{
            try {
               const res = await axios.post('/expert/login',values)
               const expert = res.data.data
               dispatch(expertLoginDetails(expert))
               toast.success(res.data.msg)
               action.resetForm()
               localStorage.setItem('experLogin',"true")
               navigate('/experts/dashboard')
            } catch (error) {
                setErr(error.response.data.msg)
                console.log(error);
            }
        }
    })

    const session = () => {
        const storedValue = localStorage.getItem('experLogin')
        // console.log(storedValue);
        if (storedValue == 'true') {
            navigate('/experts/dashboard')
        } else {
            navigate('/experts/login',{replace:true})
        }
    }

    useEffect(() => {
        session()
    }, [])
    




    return (
        <div>
            <div className="container exlogin">
                <div className="exform-box shadow-2xl">
                    <div className="img ">
                        <img src="/elbow.png" alt="Logo"/>
                    </div>
                    <div className="header-form">
                        <h4 className="text-primary-login text-bold drop-shadow-xl">
                            EXPERT LOGIN
                        </h4>
                        {err?showErrMsg(err):null}  
                        </div>
                    <div className="body-form">
                        <form onSubmit={handleSubmit} >
                            {<p className='text-red-600 bold'>{errors.phone&&touched.phone?(errors.phone):null}</p>}
                            <div className="input-group mb-3">
                                <input type="text"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='phone'
                                    className="form-control block w-full px-4 py-2 mt-2"
                                    placeholder="Enter your phone number"/>
                            </div>
                            {<p className='text-red-600 bold'>{errors.password&&touched.password?(errors.password):null}</p>}
                            <div className="input-group mb-3">
                                <input type="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='password'
                                    className="form-control block w-full px-4 py-2 mt-2"
                                    placeholder="Password"/>
                            </div>
                           
                            <button class="btn-login shadow  bg-black hover:bg-violet-600  text-white font-bold py-2 px-4 rounded-full items-center justify-center mx-auto content-center">Login</button>
                            <div className="message">
                            <div className="signup items-center justify-center w-full">
                            <a href="/experts/signup" className="sign hover:bg-violet-600 mb-4 mr-3" style={{color: "black"}}>Signup</a>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpertLogin
