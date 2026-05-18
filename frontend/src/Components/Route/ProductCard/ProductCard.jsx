import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/styles';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';


// THE DATA WHICH WE ARE DEALING WITH IN THIS 
// FILE IS ACTUALLY THE PRODUCT DATA WHICH
// WE ARE GETTING FROM THE BACKEND AND THEN
// WE ARE PASSING IT TO THIS COMPONENT AND THEN
// WE ARE DISPLAYING IT IN THE CARD FORMAT
// ITS STATIC DATA IS PRESENT IN STATIC->DATA.JS FILE AND INSIDE IN WITH NAME productData


const ProductCard = ({ data }) => {

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data?.name || '';
  const product_name = d.replace(/\s+/g, '-'); // replace spaces with '-'
  const imgSrc = data?.image_Url[0].url || data?.image_Url[1]?.url || data?.image_Url || "https://via.placeholder.com/300";

  return (
    <>

    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/product/${product_name}`}>
          <img src={imgSrc}
          className='w-full h-[170px] object-contain'
          alt={d} />
        </Link>



        {/* //this link is for the shop ... we havent made shops yet */}
        <Link to="/">
         <h5 className={`${styles.shop_name}`}>
            {data.shop.name}
         </h5> 
        </Link>





        {/* name of the product */}
        <Link to={`/product/${product_name}`}>
         <h4 className='pb-3 font-[500]'>
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
         </h4>

          <div className="flex">
            <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
            />

            <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
            />

            <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
            />

            <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
            />

            <AiFillStar
            className="mr-2 cursor-pointer"
            size={20}
            color="#F6BA00"
            />

          </div>





          {/* for showing price */}
          <div className="flex items-center justify-between py-2">
              <div className='flex'>
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data.price ? `${data.price}$` : `${data.discount_price}$`}
                </h5>

              </div>



                {/* shows kitne sold hue hain */}
                <span className="font-[400] text-[17px] text-[#68d284]">
                  {data?.total_sell} sold
                </span>
          </div>

          </Link>






          {/* side wale icons jo teen hain */}
          <div>

{/* If NOT clicked THEN SHOW A HOLLOW HEART SIGN AND AGAR CLICK KR DIYA TO WO RED HO JAE GA , UN K TITLE B US HISAAB SE UPDATE KRLO */}
            {click? (
              <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={()=>setClick(!click)}
              color={click ? "red" : "#333"}
              title='Remove from wishlist'
              />
            ) : (

              <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5" 
              onClick={()=>setClick(!click)}
              title='Add to wishlist'
              />

            )}



              <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)} // isse hum open state ko toggle kar rahe hain jab bhi user eye icon pe click karega to open state true ya false ho jayega
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={23}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
          />


            {/* agar open true hoga (tb hoga jb hum eye walee icon pe click kren ge)  to productDetailsCard  dikha do */}
            
            {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}   {/* setOpen is passed as a prop to ProductDetailsCard so that the child component can close itself.  we r also passing data as a prop so it can use it*/}



          </div>

        


    </div>
    
    </>
  )
}

export default ProductCard