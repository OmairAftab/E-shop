import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage} from "./Routes.js"
import HomePage from "./Pages/Home.jsx"
import NotFound from "./Pages/NotFound.jsx"

import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
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