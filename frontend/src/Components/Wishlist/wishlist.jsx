import React from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../Styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from 'react';
import { HiPlus , HiOutlineMinus} from "react-icons/hi";
import { Link } from 'react-router-dom';
import { BiSolidCar } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import {removeFromWishlist} from  '../../redux/actions/wishlist';
import { addTocart } from '../../redux/actions/cart';
import { toast } from 'react-toastify';


const Wishlist = ({setOpenWishlist}) => {

  const {wishlist} = useSelector((state)=>state.wishlist)
  


  


  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
            <div className="flex w-full justify-START pt-5 pr-5  ">
                <RxCross1 
                className="fixed right-4 top-2 cursor-pointer"
                size={25}
                onClick={() => setOpenWishlist(false)}
                />   




                {/* ITEMS LENGTH */}
                <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} 
                className=""
                />
                <h5 className=" text-[20px] ml-2 pl-2 font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>


             </div>  





            {/* CART SINGLE ITEM */}
            <br />
            { (wishlist && wishlist.length == 0) ? (
              <div className="text-center w-full h-full flex flex-col items-center mt-[42%] justify-center font-bold">
                Wishlist is empty!
              </div>
            ): 
            
            (
              <div className="w-full border-t">
              {wishlist && wishlist.map((i,index)=>(
                 <CartSingle                               //HAR CART ITEM KE LIYE ALAG COMPONENT BANAYENGE
                  key={index}
                  data={i}
                 />
              ))}
            </div>
            )}
            

           
        </div>

          



      </div>

    </div>
  )
}














const CartSingle=({data})=>{
  const [value, setValue] = useState(data.qty || 1);
  const totalPrice = data.discountPrice * value;
  const {cart}= useSelector((state)=>state.cart)
  const {wishlist}= useSelector((state)=>state.wishlist)

  const dispatch=useDispatch();

  const removeFromWishlistHandler=(data)=>{
    dispatch(removeFromWishlist(data))
  }


  //jab user Add to cart button pe click karega to ye function call hoga aur ye product ko cart me add karega
        const AddToCartHandler = async (id) => {
          const isItemExist= cart.find((i)=>i._id===id)  //ye check karega ki ye product already cart me hai ya nahi
          if(isItemExist){
            toast.error("Item Already in cart!")
          }
          else{
            if(data.stock < 1){
              toast.error("Product stock limited!")
            }
            else{
              const cartData = { ...data, qty: 1 };  //cartData me product data aur quantity store kar rahe hain
             await dispatch(addTocart(cartData));
              toast.success("Item added to cart successfully!");
            }
          }
          console.log("Cart state right now:", JSON.parse(localStorage.getItem("cartItems")));
        }
    



  
//THATS THE SAME WAY WE CORRECTED IMAGE ERROR IN PRODUCT DETAILS CARD COMPONENT, WE WILL DO THE SAME HERE TOO
const resolveImageUrl = (image) => {
  if (!image) return null;

  if (typeof image === 'string') {
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
      return image;
    }

    if (image.startsWith('/')) {
      return `${backend_url}${image.replace(/^\//, '')}`;
    }

    return `${backend_url}uploads/${image}`;
  }

  if (typeof image === 'object') {
    const objectUrl = image.url || image.src;

    if (!objectUrl) return null;

    if (objectUrl.startsWith('http://') || objectUrl.startsWith('https://') || objectUrl.startsWith('data:')) {
      return objectUrl;
    }

    if (objectUrl.startsWith('/')) {
      return `${backend_url}${objectUrl.replace(/^\//, '')}`;
    }

    return `${backend_url}uploads/${objectUrl}`;
  }

  return null;
};


  //THATS THE SAME WAY WE CORRECTED IMAGE ERROR IN PRODUCT DETAILS CARD COMPONENT, WE WILL DO THE SAME HERE TOO
  const imageCandidates = [
    ...(Array.isArray(data?.images) ? data.images : []),
    ...(Array.isArray(data?.image_Url) ? data.image_Url : []),
    data?.image_Url,
    data?.image,
    data?.thumbnail,
  ];
  const imageSource = imageCandidates.map(resolveImageUrl).find(Boolean);
  const imgSrc = imageSource || 'https://via.placeholder.com/300';



  return(


     <div className="border-b p-4">
      <div className="w-full flex items-center">

        <RxCross1 
        className='cursor-pointer'
        onClick={()=> removeFromWishlistHandler(data)}
        />

        <img
          src={imgSrc}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        {/* NEECHE WALA DIV WILL BE RESPONSIBLE FOR QUANTITY CONTROLS */}
   

        
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

      

      <div>
        <BsCartPlus
          size={25}
          className="fixed right-7 cursor-pointer"
          title="Add to Cart"
          onClick={()=> AddToCartHandler(data._id)}
        />
      </div>


      </div>
    </div>
  )
}







export default Wishlist