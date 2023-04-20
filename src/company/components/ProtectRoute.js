import React from 'react'
import { useMajorGlobalContext } from '../../context'
import { Navigate, useParams } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
  const { details, authenticatee } = useMajorGlobalContext()
  const { company } = useParams()
  const cache = JSON.parse(localStorage.getItem('DawaFasta'))
  if (cache) {
    if (!cache.isUser && cache.company.company_name === company) {
      return children
    }
  }
  return <Navigate to='/company/login' replace />
}

export default ProtectRoute
