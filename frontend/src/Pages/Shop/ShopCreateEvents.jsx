import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import CreateEvent from '../../Components/Shop/CreateEvent'

const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader/>

        <div className='flex items-center justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={6}/>
            </div>

            <div className="w-full justify-center flex">
                <CreateEvent />
            </div>

        </div>
    </div>
  )
}

export default ShopCreateEvents