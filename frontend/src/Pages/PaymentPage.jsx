import React from 'react'
import Header from '../Components/Layout/Header.jsx'
import Footer from '../Components/Layout/Footer.jsx'
import Payment from '../Components/Payment/Payment.jsx'
import CheckOutSteps from '../Components/Checkout/CheckOutSteps.jsx'

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <br />
       <br />
       <CheckOutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage