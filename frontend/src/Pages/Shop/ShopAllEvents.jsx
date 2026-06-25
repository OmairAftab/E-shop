import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import AllEvents from '../../Components/Shop/AllEvents'

const ShopAllEvents = () => {
  return (
     <div>
        <DashboardHeader/>

        <div className='flex  justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={5}/>
            </div>

            <div className="w-full justify-center flex">
               <AllEvents/>
            </div>

        </div>
    </div>
  )
}

export default ShopAllEvents