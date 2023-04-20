import React from 'react'
import { useMajorGlobalContext } from '../../context'

const Settings = () => {
 const {details} = useMajorGlobalContext(); 
 return (
    <div>Settings for {details.user_name}</div>
  )
}

export default Settings