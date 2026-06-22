import React from 'react'
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer'
import CheckoutSteps from '../Components/Checkout/CheckOutSteps'
import Checkout from '../Components/Checkout/Checkout'


const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </div>
  )
}

export default CheckoutPage