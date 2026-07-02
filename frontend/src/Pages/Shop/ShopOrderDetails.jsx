import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import Footer from '../../Components/Layout/Footer'
import OrderDetails from '../../Components/Shop/OrderDetails'

const ShopOrderDetails = () => {
  return (
    <div>
        <DashboardHeader/>

        <div className='w-11/12 mx-auto py-6'>
          <OrderDetails/>
        </div>

        <Footer/>
    </div>
  )
}

export default ShopOrderDetails