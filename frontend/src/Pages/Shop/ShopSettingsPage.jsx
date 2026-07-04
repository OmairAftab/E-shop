import React from 'react'
import Footer from '../../Components/Layout/Footer'
import Header from '../../Components/Layout/Header'
import ShopSettings from '../../Components/Shop/ShopSettings.jsx'

const ShopSettingsPage = () => {
  return (
    <div>
        <Header/>
            <ShopSettings/>
        <Footer/>
    </div>
  )
}

export default ShopSettingsPage