import React from 'react'
import './Notification.css'
import {BsCheck2Circle} from 'react-icons/bs'
import {BiError} from 'react-icons/bi'



export const showErrMsg = (msg) =>{
    return <div className='errMsg'><BiError className='check' size="30px"/>{msg}</div>
}

export const showSuccessMsg = (msg) =>{
    return <div className='successMsg'><BsCheck2Circle className='check' size="30px"/>{msg}</div>
}