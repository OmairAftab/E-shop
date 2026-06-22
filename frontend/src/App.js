import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage} from "./Routes.js"
import {SignUpPage, BestSellingPage, EventsPage, FAQpage, ProductsDetailPage, ShopLoginPage,  CreateShopPage} from "./Routes.js"
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
import { useSelector } from 'react-redux'
import ProfilePage from './Pages/ProfilePage.jsx'
import { loadSeller } from './redux/actions/user.js'
import ShopHomePage from './Pages/Shop/ShopHomePage.jsx'
import SellerAuthRoute from './routes/SellerAuthRoute.js'

const App = () => {

    const { loading } = useSelector((state) => state.user);
    const {isLoading, isSeller, seller} = useSelector((state) => state.seller);


  useEffect(()=>{

    Store.dispatch(loadUser())   // dispatches the loadUser action to fetch the current user's data from the server when the component mounts. This is important for maintaining user authentication state across page reloads or when the user navigates to different parts of the application.
    Store.dispatch(loadSeller()) // dispatches the loadSeller action to fetch the current seller's data from the server when the component mounts. This is important for maintaining seller authentication state across page reloads or when the seller navigates to different parts of the application.

  },[])


  return (
    <>
    {
      loading || isLoading ?  null : 
      (
         <BrowserRouter>
    <ToastContainer position="top-right" />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='*' element={<NotFound />} />
      <Route path="/products" element={<ProductsPage/>} />
      <Route path="/best-selling" element={<BestSellingPage/>} />
      <Route path="/events" element={<EventsPage/>} />
      <Route path="/faq" element={<FAQpage/>} />
      <Route path='/product/:name' element={<ProductsDetailPage/>} />
      <Route path='/profile' element={<ProfilePage/>} />

      {/*   SHOP ROUTES */}
      <Route
        path='/create-shop'
        element={
          <SellerAuthRoute>
            <CreateShopPage />
          </SellerAuthRoute>
        }
      />

      <Route
        path='/shop-login'
        element={
          <SellerAuthRoute>
            <ShopLoginPage />
          </SellerAuthRoute>
        }
      />
        
      <Route path='/shop/:id' element={<ShopHomePage/>} />
      

    </Routes>
    </BrowserRouter>
      )
    }
    </>
   
  )
}

export default App