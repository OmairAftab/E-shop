import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage, BestSellingPage} from "./Routes.js"
import HomePage from "./Pages/HomePage.jsx"
import NotFound from "./Pages/NotFound.jsx"
import { server } from './server.js'
import axios from 'axios'
import "./App.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import Store from "./redux/store.js"
import { loadUser } from './redux/actions/user.js'
import ProductsPage from './Pages/ProductsPage.jsx'


const App = () => {

  useEffect(()=>{

    Store.dispatch(loadUser())

  },[])


  return (
    <BrowserRouter>
    <ToastContainer position="top-right" />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='*' element={<NotFound />} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/best-selling" element={<BestSellingPage/>} />
      

    </Routes>
    </BrowserRouter>
  )
}

export default App