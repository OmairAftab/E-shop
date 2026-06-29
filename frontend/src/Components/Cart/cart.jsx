import React from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../Styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from 'react';
import { HiPlus , HiOutlineMinus} from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cart';
import { addTocart } from '../../redux/actions/cart';

const Cart = ({setOpenCart}) => {

    const {cart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()

    const removefromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    }

    const totalPriceOfALLCart= (cart.reduce((acc, item) => acc + item.discountPrice * item.qty, 0)).toFixed(2);



 

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
                  {cart && cart.length} items
                </h5>
              </div>


             </div>  





            {/* CART SINGLE ITEM */}
            <br />
            <div className="w-full border-t">
              {cart && cart.map((i,index)=>(
                 <CartSingle                               //HAR CART ITEM KE LIYE ALAG COMPONENT BANAYENGE
                  key={index}
                  data={i}
                 />
              ))}
            </div>

           
        </div>

          
            {
              (cart && cart.length == 0) ? (
                <div className="text-center w-full h-screen flex items-center justify-center flex-col font-bold ">
                    No item in the cart! <br /> 
                </div>
              ) : (

              <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD${totalPriceOfALLCart})
                  </h1>
                </div>
              </Link>
            </div>
  )
            }
          

      </div>

    </div>
  )
}





const CartSingle=({data})=>{
  const [value, setValue] = useState(data.qty || 1);
  const totalPrice = data.discountPrice * value;

  const dispatch = useDispatch()

    const removefromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    }
  

  const increment = (data) => {
    const newQty = value + 1;
    setValue(newQty);
    dispatch(addTocart({ ...data, qty: newQty })); // Update the quantity in the cart of the redux store
    }

    const decrement = (data) => {
      const newQty = value > 1 ? value - 1 : 1;
    setValue(newQty);
    dispatch(addTocart({ ...data, qty: newQty }));  // Update the quantity in the cart of the redux store
    }


  

  return(
     <div className="border-b p-4">
      <div className="w-full flex items-center justify-around">

        {/* NEECHE WALA DIV WILL BE RESPONSIBLE FOR QUANTITY CONTROLS */}
        <div> 
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          > 
          <HiPlus size={18} color="#fff" />
        </div>

          <span  className="ml-2">
            {value}
          </span>

        <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
        </div>
        </div>


{/* ITEMS IN CART WITH THEIR NAME, PRICE*VALUE,  TOTALPRICE */}
        <img
            src={`${backend_url}${data.images[0]}`}
            alt={data.name}
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

        <RxCross1
          className="ml-5 cursor-pointer"
          onClick={() => removefromCartHandler(data)}
        />


      </div>
    </div>
  )
}







export default Cart