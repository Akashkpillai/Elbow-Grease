import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "../../../api/axios";
import './login.css'
import {showErrMsg,showSuccessMsg} from "../../util/notifications/Notification"
import {useDispatch} from 'react-redux'
import jwt from "jwt-decode"
import {userToken} from '../../Redux/adminReducer'


const initialState = {
    email:'',
    password:'',
    err:'',
    success:''
}


function Login() {
    const LOG_URL = '/users/login'
   const [user,setUser] = useState(initialState)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {email,password,err,success} = user

   const handleChangeInput = e =>{
    const {name,value} = e.target
    setUser({...user,[name]:value,err:'',success:''})
   }

   const logUser = async e =>{
    e.preventDefault()
    try {
        const res = await axios.post(LOG_URL,{email,password})
        setUser({...user,err:'',success:res.data.msg});
        localStorage.setItem('userInfo',res.data.data)
        const token = res.data.data
        dispatch(userToken(token))
        navigate('/userHome')
    } catch (err) {
       err.response.data.msg && setUser({...user,err:err.response.data.msg,success:''})
    }
   }


  return (
    <div>
    <div className="container login">
         <div className="form-box shadow-2xl">
            <div className="img ">
                <img src="/elbow.png" alt="Logo" />
            </div>
             <div className="header-form">
                 <h4 className="text-primary-login text-bold drop-shadow-xl">
                    LOGIN 
                 </h4>
                 {err && showErrMsg(err)}
                 {success && showSuccessMsg(success)}
                 {/* <div className="vali"><h4 className='valiText' >{}</h4></div> */}
             </div>
             <div className="body-form">
                 <form onSubmit={logUser} >
                     <div className="input-group mb-3">
                         <input  type="Email"  value={email} name="email" onChange={handleChangeInput} className="form-control block w-full px-4 py-2 mt-2"  placeholder="Email"/>   
                     </div>  
                     <div className="input-group mb-3">
                         <input type="Password" value={password} name='password' onChange={handleChangeInput} className="form-control block w-full px-4 py-2 mt-2"   placeholder="Password"/>
                     </div>
                     <button type="submit" class="btn-login shadow  bg-black hover:bg-violet-600  text-white font-bold py-2 px-4 rounded-full items-center justify-center mx-auto content-center">Login</button>
                     <div className="message">
                         <div className="signup items-center justify-center w-full">
                            <a href="/signup" className="sign hover:bg-violet-600 mb-4 mr-3" style={{color: "black"}}>Signup</a>
                            <a href="/forgot_password" className="sign hover:bg-violet-600 mb-4" style={{color: "black"}} >forgot password?</a>
                         </div>
                     </div>
                 </form>
             </div>
         </div>
     </div>
 </div>
  )
}

export default Login;
