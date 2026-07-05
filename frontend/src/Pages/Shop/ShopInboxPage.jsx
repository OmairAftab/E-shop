import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import DashboardMessages from '../../Components/Shop/DashboardMessages'

const ShopInboxPage = () => {
  return (
    <div>
        <DashboardHeader/>

        <div className='flex  justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={8}/>
            </div>

            <div className="w-full justify-center flex">
               <DashboardMessages/>
            </div>

        </div>
    </div>
  )
}

export default ShopInboxPage