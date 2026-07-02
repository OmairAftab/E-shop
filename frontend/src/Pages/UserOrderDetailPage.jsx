import React from 'react'
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer'
import UserOrderDetailComponent from '../Components/UserOrder/UserOrderDetailComponent'



//THIS IS THE PAGE THAT WILL APPEAR WHEN WE CLICK ORDERS IN /PROFILE PAGE
//THEN WHEN ORDERS ARE APPEARING AND THERE -> AHEAD OF EACH ORDER
//SO AFTER CLICKING THAT ARROW THIS PAGE WILL APPEAR AND PROVIDE DETAILS ABOUT THAT PAGE

const UserOrderDetailPage = () => {
  return (
    <div>
    <Header/>
    <UserOrderDetailComponent/>
    <Footer/>
    
  
  </div>
  )
}

export default UserOrderDetailPage