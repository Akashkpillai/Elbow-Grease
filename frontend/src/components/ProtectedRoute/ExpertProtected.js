import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const useAuth = () => {
    const token = useSelector((state) => state.admin.expertDetails)
    const user = token
    return user && token
}

const ProtectRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to='/experts/login' />
}

export default ProtectRoute