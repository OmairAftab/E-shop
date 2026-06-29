import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/styles';
import { backend_url } from '../../../server';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { addTocart } from '../../../redux/actions/cart';



// THE DATA WHICH WE ARE DEALING WITH IN THIS 
// FILE IS ACTUALLY THE PRODUCT DATA WHICH
// WE ARE GETTING FROM THE BACKEND AND THEN
// WE ARE PASSING IT TO THIS COMPONENT AND THEN
// WE ARE DISPLAYING IT IN THE CARD FORMAT
// ITS STATIC DATA IS PRESENT IN STATIC->DATA.JS FILE AND INSIDE IN WITH NAME productData


const ProductCard = ({ data }) => {

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const{wishlist} = useSelector((state)=>state.wishlist)
  const {cart} = useSelector((state)=>state.cart)






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
  







  // Function to handle adding an item to the wishlist
  const addToWishlistHandler = async (data) => {
    setClick(!click);
    await dispatch(addToWishlist(data));
    toast.success("Item added to wishlist successfully!");
  }

  // Function to handle removing an item from the wishlist
  const removeFromWishlistHandler = async (data) => {
    setClick(!click);
    await dispatch(removeFromWishlist(data));
  }




// Jo jo products pehle hee wishlist main added hain to reload k baad b wo added rhen
  useEffect(() => {
    if (wishlist && data && wishlist.find((i) => i && i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);





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



  const d = data?.name || '';
  const product_name = d.replace(/\s+/g, '-'); // replace spaces with '-'
  const imageCandidates = [
    ...(Array.isArray(data?.images) ? data.images : []),
    ...(Array.isArray(data?.image_Url) ? data.image_Url : []),
    data?.image_Url,
    data?.image,
    data?.thumbnail,
  ];
  const imageSource = imageCandidates.map(resolveImageUrl).find(Boolean);
  const shopName = data?.shop?.name || 'Unknown shop';
  const shopId = data?.shop?._id || '';
  const imgSrc = imageSource || 'https://via.placeholder.com/300';
  const displayPrice = data?.price ?? data?.discountPrice ?? data?.discount_price ?? 0;
  const soldCount = data?.total_sell ?? data?.sold_out ?? 0;

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
        <Link to={`/shop/${shopId}`}>
         <h5 className={`${styles.shop_name}`}>
            {shopName}
         </h5> 
        </Link>





        {/* name of the product */}
        <Link to={`/product/${product_name}`}>
         <h4 className='pb-3 font-[500]'>
            {d.length > 40 ? d.slice(0, 40) + "..." : d}
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
                  {`${displayPrice}$`}
                </h5>

              </div>



                {/* shows kitne sold hue hain */}
                <span className="font-[400] text-[17px] text-[#68d284]">
                  {soldCount} sold
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
              onClick={async () => await removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title='Remove from wishlist'
              />
            ) : (

              <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5" 
              onClick={async () => await addToWishlistHandler(data)}
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
            onClick={() => AddToCartHandler(data._id)}
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