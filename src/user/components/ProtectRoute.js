import React from 'react'
import { useMajorGlobalContext } from '../../context'
import { Navigate, useParams } from 'react-router-dom';

const ProtectRoute = ({children}) => {
 const {details, authenticatee} = useMajorGlobalContext(); 
 const {userName}= useParams();
 const cache = JSON.parse(localStorage.getItem('DawaFasta'))
 if(cache){
 if(cache.isUser &&  cache.user.user_name===userName){
  return children
 }}
 return <Navigate to='/user/login' replace/>
  
}

export default ProtectRoute