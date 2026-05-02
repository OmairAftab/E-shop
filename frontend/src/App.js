import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage} from "./Routes.js"
import HomePage from "./Pages/Home.jsx"
import NotFound from "./Pages/NotFound.jsx"

import "./App.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
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