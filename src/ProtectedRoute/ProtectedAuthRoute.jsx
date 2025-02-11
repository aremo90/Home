import React, { useContext } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate } from 'react-router'

export default function ProtectedAuthRoute( {children} ) {

  const{isLoggedIn} = useContext(authContext)
  
  return (
    isLoggedIn ? <Navigate to={"/"} /> : children
  )
}
