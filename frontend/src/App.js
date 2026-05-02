import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage} from "./Routes.js"
import HomePage from "./Pages/Home.jsx"
import NotFound from "./Pages/NotFound.jsx"
import { server } from './server.js'
import axios from 'axios'
import "./App.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

const App = () => {

  useEffect(()=>{
    axios.get(`${server}/user/getuser`,{withCredentials:true}).then((res)=>{
      toast.success(res.data?.message || "Welcome")
    }).catch((err)=>{
      const msg = err?.response?.data?.message || err?.message || "Something went wrong"
      toast.error(msg)
    })
  },[])


  return (
    <BrowserRouter>
    <ToastContainer position="top-right" />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='*' element={<NotFound />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App