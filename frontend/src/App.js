import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {LoginPage,SignUpPage, BestSellingPage, EventsPage, FAQpage, ProductsDetailPage, ShopLoginPage,  CreateShopPage, CheckoutPage, PaymentPage, OrderSuccessPage, UserOrderDetailPage, TrackOrderPage} from "./routes/Routes.js"
import { ShopCreateProduct, ShopAllProduct, ShopCreateEvents , ShopAllEvents, ShopAllCoupons, ShopAllOrders, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage} from './routes/ShopRoutes.js'
import ShopDashboardPage from './Pages/Shop/ShopDashboardPage.jsx'
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
import { getAllProducts } from './redux/actions/product.js'
import { getAllEvents } from './redux/actions/event.js'
import SellerAuthRoute from './routes/SellerAuthRoute.js'
import ProtectedRoute from './routes/ProtectedRoute.js'
import SellerRedirectRoute from './routes/SellerRedirectRoute.js'

const App = () => {

    const { loading } = useSelector((state) => state.user);
    const {isLoading, isSeller, seller} = useSelector((state) => state.seller);


  useEffect(()=>{

    Store.dispatch(loadUser())   // dispatches the loadUser action to fetch the current user's data from the server when the component mounts. This is important for maintaining user authentication state across page reloads or when the user navigates to different parts of the application.
    Store.dispatch(loadSeller()) // dispatches the loadSeller action to fetch the current seller's data from the server when the component mounts. This is important for maintaining seller authentication state across page reloads or when the seller navigates to different parts of the application.
    Store.dispatch(getAllProducts())
    Store.dispatch(getAllEvents())
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

      <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

      <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <UserOrderDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />





      {/*   SHOP ROUTES */}
      <Route
        path='/create-shop'
        element={
          <SellerRedirectRoute>
            <CreateShopPage />
          </SellerRedirectRoute>
        }
      />

      <Route
        path='/shop-login'
        element={
          <SellerRedirectRoute>
            <ShopLoginPage />
          </SellerRedirectRoute>
        }
      />

      <Route path='/shop/:id' element={ 
          <SellerAuthRoute>
            <ShopHomePage/>
          </SellerAuthRoute>
        } />

      <Route
        path='/dashboard'
        element={
          <SellerAuthRoute>
            <ShopDashboardPage />
          </SellerAuthRoute>
        }
      />


      <Route
        path='/dashboard-create-product'
        element={
          <SellerAuthRoute>
            <ShopCreateProduct />
          </SellerAuthRoute>
        }
      />

      <Route
        path='/dashboard-products'
        element={
          <SellerAuthRoute>
            <ShopAllProduct />
          </SellerAuthRoute>
        }
      />


      <Route
        path='/dashboard-create-event'
        element={
          <SellerAuthRoute>
            <ShopCreateEvents />
          </SellerAuthRoute>
        }
      />



      <Route
        path='/dashboard-events'
        element={
          <SellerAuthRoute>
            <ShopAllEvents />
          </SellerAuthRoute>
        }
      />


          <Route
            path='/dashboard-coupons'
            element={
              <SellerAuthRoute>
                <ShopAllCoupons />
              </SellerAuthRoute>
            }
          />


      <Route
            path='/dashboard-orders'
            element={
              <SellerAuthRoute>
                <ShopAllOrders />
              </SellerAuthRoute>
            }
          />

        <Route
            path='/dashboard-refunds'
            element={
              <SellerAuthRoute>
                <ShopAllRefunds />
              </SellerAuthRoute>
            }
          />

      <Route
            path='/order/:id'
            element={
              <SellerAuthRoute>
                <ShopOrderDetails />
              </SellerAuthRoute>
            }
          />

        <Route
            path='/settings'
            element={
              <SellerAuthRoute>
                <ShopSettingsPage />
              </SellerAuthRoute>
            }
          />
    
          


    </Routes>
    </BrowserRouter>
      )
    }
    </>
   
  )
}

export default App