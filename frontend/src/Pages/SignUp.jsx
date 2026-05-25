import React from 'react'
import SignUp from '../Components/SignUp/SignUp.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

  const navigate= useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");  // If the user is already authenticated, we redirect them to the home page. This prevents logged-in users from accessing the login page, which is a common practice to enhance user experience and security.
    }
  }, [])

  return (
    <div>
        <SignUp/>
    </div>
  )
}

export default SignUpPage