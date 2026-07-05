import React from 'react'
import Footer from '../../Components/Layout/Footer'
import Header from '../../Components/Layout/Header'
import ShopSettings from '../../Components/Shop/ShopSettings.jsx'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'

const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader/>
            <ShopSettings/>
        <Footer/>
    </div>
  )
}

export default ShopSettingsPage