import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

const ProtectRoute = ({children}) => {
 const {userName}= useParams();
 const cache = JSON.parse(localStorage.getItem('DawaFasta'))
 if(cache){
 if(cache.isUser &&  cache.user.user_name===userName){
  return children
 }}
 return <Navigate to='/user/login' replace/>
  
}

export default ProtectRoute