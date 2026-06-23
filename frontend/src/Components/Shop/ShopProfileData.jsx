import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/styles.js'
import { backend_url } from '../../server.js'
import { productData } from '../../Static/data.js'
import ProductCard from '../Route/ProductCard/ProductCard.jsx'

const ShopProfileData = ({ isOwner }) => {

    const [active, setActive] = useState(1);
    //YE ACTIVE WALA HO HEE HISAAB A JESE USER K PAGE PE SIDEBAR THA ORDERTRACKING, PROFILE, CHANGE PASSWORD ETC.
    //  WAHI HAI YE ACTIVE WALA HISAAB. JAB USER CLICK KAREGA TOH ACTIVE STATE CHANGE HO JAYEGA AUR USKE HISAB SE DATA SHOW HOGA.

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">



    {/* if active === 1,2,3, etc, that tab text turns red (selected state); clicking any tab calls setActive(n), 
    which re-renders all three tabs and updates which one shows red — the actual content shown below 
    (products/events/reviews) should also depend on this same `active` value */}


        
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>






          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>





          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>




        </div>





        {/* Only the shop owner sees this "Go to Dashboard" button — regular visitors viewing the shop page should not see it,
         since they can't access seller-only pages. isOwner is passed down as a prop from the parent
         (set true only when the logged-in seller is viewing their own shop). */}
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go to Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>





      <br />

      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {/* this isn;t the actual shop data.. will make it dynamic after sometime */}
          {productData &&
            productData.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

    </div>
  )
}

export default ShopProfileData