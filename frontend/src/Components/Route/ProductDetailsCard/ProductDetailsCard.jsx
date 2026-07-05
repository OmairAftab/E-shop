import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../../Styles/styles';
import { backend_url, server } from '../../../server';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addTocart } from '../../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



// IS MAIN JO HUM DATA RECEIVE KAR RAHE HAIN AS PROP
// WO ACTUALLY PRODUCT DATA HAI JO HUM BACKEND SE LE RAHE HAIN 
// AUR PHIR HUM USSE IS COMPONENT ME PASS KAR RAHE HAIN 
// AUR PHIR HUM USSE CARD FORMAT ME DISPLAY KAR RAHE HAIN


const ProductDetailsCard = ({setOpen, data}) => {
    const [count,setCount]=useState(1)
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(false)
  const [shopInfo, setShopInfo] = useState(null);
    const {cart} =useSelector((state)=>state.cart)
    const dispatch = useDispatch()

    const {wishlist} = useSelector((state)=>state.wishlist)





    //jab user Add to cart button pe click karega to ye function call hoga aur ye product ko cart me add karega
    const AddToCartHandler = async (id) => {
      const isItemExist= cart.find((i)=>i._id===id)  //ye check karega ki ye product already cart me hai ya nahi
      if(isItemExist){
        toast.error("Item Already in cart!")
      }
      else{
        if(data.stock < count){
          toast.error("Product stock limited!")
        }
        else{
          const cartData = { ...data, qty: count };  //cartData me product data aur quantity store kar rahe hain
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

      useEffect(() => {
        const shopId = data?.shop?._id;

        if (!shopId) {
          setShopInfo(null);
          return;
        }

        axios
          .get(`${server}/shop/get-shop-info/${shopId}`, { withCredentials: true })
          .then((res) => {
            setShopInfo(res.data.shop);
          })
          .catch((error) => {
            console.error("Error fetching shop info:", error);
          });
      }, [data?.shop?._id]);
    





    const handleMessageSubmit = () => {};
    
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




    // THE IMAGE CANDIDATES ARRAY IS USED TO STORE ALL POSSIBLE IMAGE SOURCES FOR A PRODUCT, events, OR SHOP.
    //  IT INCLUDES VARIOUS PROPERTIES THAT MAY CONTAIN IMAGE URLs, SUCH AS data.images, data.image_Url, 
    // data.image, data.thumbnail, AND THE SHOP'S AVATAR. THE resolveImageUrl FUNCTION IS THEN USED TO DETERMINE 
    // THE ACTUAL URL TO USE FOR DISPLAYING THE IMAGE. AS WE ARE USING THIS PRODUCT CARD AND WE HAVE TO COVER THAT HOW TO SHOW
    //  THEIR PICTURES BASED ON HOW EVENT'S MODEL IS TAKING THE PICTURES AND HOW PRODUCT'S MODEL IS TAKING THE PICTURES AND 
    // HOW SHOP'S MODEL IS TAKING THE PICTURES SO WE HAVE TO COVER ALL OF THEM SO THAT'S WHY WE ARE USING THIS IMAGE CANDIDATES ARRAY.
    const imageCandidates = [
      ...(Array.isArray(data?.images) ? data.images : []),
      ...(Array.isArray(data?.image_Url) ? data.image_Url : []),
      data?.image_Url,
      data?.image,
      data?.thumbnail,
    ];
    const imageSource = imageCandidates.map(resolveImageUrl).find(Boolean);
    const shop = shopInfo || data?.shop;
    const shopAvatar = resolveImageUrl(shop?.avatar);
    const shopName = shop?.name || 'Unknown shop';
    const shopId = shop?._id || '';
    const shopRating = shop?.ratings ?? 0;







      const decrementCount = () => {
       if (count > 1) {
       setCount(count - 1);
    }
  };




  const incrementCount = () => {
    setCount(count + 1);
  };


  // Calculate prices based on backend schema: discountPrice is the active current price, originalPrice is the old price
  const activePrice = data?.discountPrice ?? data?.price ?? data?.discount_price ?? 0;
  const originalPrice = data?.originalPrice ?? data?.original_price;
  const soldCount = data?.total_sell ?? data?.sold_out ?? 0;

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />


            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={imageSource || 'https://via.placeholder.com/300'} alt="" />
                <Link to={`/shop/${shopId}`}>
                <div className="flex">
                    <img
                      alt=""
                      src={shopAvatar || 'https://via.placeholder.com/50'}   
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />


{/* show shop name and rating inside product card */}
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {shopName}
                      </h3>
                      <h5 className="pb-3 text-[15px]">({shopRating}) Ratings</h5>
                    </div>

                </div>
                </Link>


{/* MESSAGE BUTTON */}
                <div
                  className={`${styles.button} bg-[#000] mx-8 mt-2 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                 <h5 className="text-[16px] text-[red] mx-2 mt-5"> ({soldCount}) Sold out</h5>

                 </div>




               {/* right side */}
            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {activePrice}$
                  </h4>
                  {originalPrice ? (
                    <h3 className={`${styles.price}`}>
                      {originalPrice}$
                    </h3>
                  ) : null}
                </div>




                {/* increment and decrement buttons */}
                <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                        <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                        >
                        -
                        </button>
                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                        </span>
                        <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                        >
                        +
                        </button>
                    </div>


                
                {/* wishlist wala jo inc/dec buttons k righht side pe heart a */}
                    <div>
                        {click ? (
                        <AiFillHeart
                            size={30}
                            onClick={()=> removeFromWishlistHandler(data)}
                            className="cursor-pointer"
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                        />
                        ) : (
                        <AiOutlineHeart
                            size={30}
                            onClick={()=> addToWishlistHandler(data)}
                            className="cursor-pointer"
                            title="Add to wishlist"
                        />
                        )}
                    </div>

                </div> {/* closes increment and decrement buttons and tthe heart icon as well mean these were two divs and were flex display*/}

                
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => AddToCartHandler(data._id)}
                  >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>



            </div>  {/* ✅ closes right side — was <div/> */}

          </div>  {/* ✅ closes block w-full 800px:flex */}
          </div>  {/* ✅ closes modal white box */}
        </div>    
      ) : null}
    </div>        
  )
}

export default ProductDetailsCard