import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Adlogin.css'
import {showErrMsg, showSuccessMsg} from "../../util/notifications/Notification"
import axios from '../../../api/axios'
import {useDispatch} from 'react-redux'
import {adminLoginDetails} from '../../Redux/adminReducer'


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ""
}

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(initialState)
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const {email, password, err, success} = admin

    const handleChangeInput = e => {
        const {name, value} = e.target
        setAdmin({
            ...admin,
            [name]: value,
            err: '',
            success: ''
        })
    }


    const logAdmin = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/admin/admin', {email, password})
            setAdmin({
                ...admin,
                err: '',
                success: res.data.msg
            });
            if (res.data.token) {
                localStorage.setItem('adminToken', res.data.token)
                localStorage.setItem('adminLogin', "true")
                const admin = res.data.token;
                dispatch(adminLoginDetails(admin))
                navigate('/admin/home')
            }

        } catch (err) {
            err.response.data.msg && setAdmin({
                ...admin,
                err: err.response.data.msg,
                success: ''
            })
        }
    }


    const session = () => {
        const storedValue = localStorage.getItem('adminLogin')
        // console.log(storedValue);
        if (storedValue == 'true') {
            navigate('/admin/home',{replace:true})
        } else {
            navigate('/admin')
        }
    }

    useEffect(() => {
        session()
    }, [])


    return (
        <div>
            <div className="container login">
                <div className="form-box shadow-2xl">
                    <div className="img ">
                        <img src="/elbow.png" alt="Logo"/>
                    </div>
                    <div className="header-form">
                        <h4 className="text-primary-login text-bold drop-shadow-xl">
                            ADMIN LOGIN
                        </h4>
                        {
                        err && showErrMsg(err)
                    }
                        {
                        success && showSuccessMsg(success)
                    } </div>
                    <div className="body-form">
                        <form onSubmit={logAdmin}>
                            <div className="input-group mb-3">

                                <input type="Email"
                                    onChange={handleChangeInput}
                                    value={email}
                                    name='email'
                                    className="form-control block w-full px-4 py-2 mt-2"
                                    placeholder="Email"/>
                            </div>
                            <div className="input-group mb-3">
                                <input type="Password"
                                    onChange={handleChangeInput}
                                    value={password}
                                    name='password'
                                    className="form-control block w-full px-4 py-2 mt-2"
                                    placeholder="Password"/>
                            </div>
                            <button class="btn-login shadow  bg-black hover:bg-violet-600  text-white font-bold py-2 px-4 rounded-full items-center justify-center mx-auto content-center">Login</button>
                            <div className="message"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
