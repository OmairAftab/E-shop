import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage} from "./Routes.js"

import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App