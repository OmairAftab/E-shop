import React from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../Styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from 'react';
import { HiPlus , HiOutlineMinus} from "react-icons/hi";
import { Link } from 'react-router-dom';

const Cart = ({setOpenCart}) => {


  const cartData=[
    {
      name:"Shirt",
      description:"This is the best shirt in the world",
      price:120000,
      image:"https://m.media-amazon.com/images/I/61i8G+qQeL._SX679_.jpg"
    },
    {
      name:"Good Shirt",
      description:"This is a great shirt for the price",
      price:25000,
      image:"https://m.media-amazon.com/images/I/61i8G+qQeL._SX679_.jpg"
    },
    {
      name:"Excellent Shirt",
      description:"This is a great shirt for the price",
      price:25000,
      image:"https://m.media-amazon.com/images/I/61i8G+qQeL._SX679_.jpg"
    }
  ]


  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
            <div className="flex w-full justify-START pt-5 pr-5  ">
                <RxCross1 
                className="fixed right-4 top-2 cursor-pointer"
                size={25}
                onClick={() => setOpenCart(false)}
                />   




                {/* ITEMS LENGTH */}
                <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} 
                className=""
                />
                <h5 className=" text-[20px] font-[500]">
                  {/* {cart && cart.length} items */}
                  3 items
                </h5>
              </div>


             </div>  





            {/* CART SINGLE ITEM */}
            <br />
            <div className="w-full border-t">
              {cartData && cartData.map((i,index)=>(
                 <CartSingle                               //HAR CART ITEM KE LIYE ALAG COMPONENT BANAYENGE
                  key={index}
                  data={i}
                 />
              ))}
            </div>

           
        </div>

          

          <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${1999})
                  </h1>
                </div>
              </Link>
            </div>

      </div>

    </div>
  )
}





const CartSingle=({data})=>{
  const [value, setValue] = useState(data.qty || 1);
  const totalPrice = data.price * value;

  return(
     <div className="border-b p-4">
      <div className="w-full flex items-center">

        {/* NEECHE WALA DIV WILL BE RESPONSIBLE FOR QUANTITY CONTROLS */}
        <div> 
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value+1)}
          > 
          <HiPlus size={18} color="#fff" />
        </div>

          <span  className="ml-2">
            {value}
          </span>

        <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue( value===1? 1:value-1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
        </div>
        </div>


{/* ITEMS IN CART WITH THEIR NAME, PRICE*VALUE,  TOTALPRICE */}
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

        <RxCross1
          className="cursor-pointer"
        />


      </div>
    </div>
  )
}







export default Cart