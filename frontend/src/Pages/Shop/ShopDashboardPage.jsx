import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader.jsx'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar.jsx'
import DashboardHero from '../../Components/Shop/DashboardHero.jsx'

const ShopDashboardPage = () => {
  return (
    <div>
        <DashboardHeader />

        <div className='flex items-center justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={1}/>
            </div>
              <DashboardHero/>
        </div>
    </div>
  )
}

export default ShopDashboardPage