import { React, useEffect } from 'react'
// import {

//    Navigate

//   } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log('logged out')
    localStorage.removeItem('token')
    // localStorage.removeItem("profile");
    navigate('/login')
  }
  useEffect(() => {
    navigate('/login')
  })

  handleLogout()
}

export default Logout
