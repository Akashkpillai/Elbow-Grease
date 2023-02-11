import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const useAuth = () => {
    const token = useSelector((state) => state.admin.adminDetails)
    console.log(token);
    const user = token
    return user && token
}

const ProtectRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to='/admin' />
}

export default ProtectRoute