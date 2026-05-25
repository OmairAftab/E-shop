import React from 'react'
import Login from '../Components/Login/Login'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

  const navigate= useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");  // If the user is already authenticated, we redirect them to the home page. This prevents logged-in users from accessing the login page, which is a common practice to enhance user experience and security.
    }
  }, [])


  return (
    <div>
        <Login />
    </div>
  )
}

export default  LoginPage