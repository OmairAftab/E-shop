import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar'
import AllProductsOfASingleShop from '../../Components/Shop/AllProductsOfASingleShop'



// THIS PAGE WILL SHOW THOSE PRODUCTS THAT BELONG TO A PARTICULAR SHOP. SO WE WILL GET THE SHOP ID
//  FROM THE URL AND THEN FETCH ALL PRODUCTS OF THAT SHOP FROM THE BACKEND AND DISPLAY THEM ON THIS PAGE.

const ShopAllProduct = () => {
  return (
    <div>
        <DashboardHeader/>

        <div className='flex  justify-between w-full '>
            <div className='800px:w-[330px] w-[80px] '>
                <DashboardSideBar active={3}/>
            </div>

            <div className="w-full justify-center flex">
               <AllProductsOfASingleShop/>
            </div>

        </div>
    </div>
  )
}

export default ShopAllProduct