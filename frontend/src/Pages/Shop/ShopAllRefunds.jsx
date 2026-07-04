import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader.jsx'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar.jsx'
import AllRefundOrders from '../../Components/Shop/AllRefundOrders.jsx'


const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
            <AllRefundOrders />
        </div>
      </div>
</div>
  )
}


export default ShopAllRefunds