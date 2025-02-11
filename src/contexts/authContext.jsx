import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";

export const authContext = createContext() //1

export default function AuthContextProvider( {children} ){

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null );
  const [userID, setUserID] = useState("")


  useEffect(() =>{

    if(localStorage.getItem("token") != null) {
      verifyToken()
    }
  }, [])

  function verifyToken(){
    axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
      headers:{
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      localStorage.removeItem("token")
      setIsLoggedIn(false)
    }).then(({data}) => {
      setUserID(data.decoded.id);
    })
  }


  return <authContext.Provider value = {     {isLoggedIn , setIsLoggedIn , userID}    }>
    {children}
  </authContext.Provider>
}