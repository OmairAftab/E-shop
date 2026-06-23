import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import CreateProduct from '../../Components/Shop/CreateProduct'

const ShopCreateProduct = () => {
  return (

    
    <div>
        <DashboardHeader/>

        <div className='flex items-center justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={4}/>
            </div>

            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>

        </div>
    </div>
  )
}

export default ShopCreateProduct