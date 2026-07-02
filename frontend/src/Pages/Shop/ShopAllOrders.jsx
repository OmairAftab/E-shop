import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import AllOrdersOfASingleShop from '../../Components/Shop/AllOrdersOfASingleShop'

const ShopAllOrders = () => {
  return (
    <div>
        <DashboardHeader/>

        <div className='flex  justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={2}/>
            </div>
            
            <div className="w-full justify-center flex">
               <AllOrdersOfASingleShop/>
            </div>
            

        </div>
    </div>
  )
}

export default ShopAllOrders