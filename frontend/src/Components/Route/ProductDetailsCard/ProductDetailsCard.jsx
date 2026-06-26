import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import styles from '../../../Styles/styles';
import { backend_url } from '../../../server';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";



// IS MAIN JO HUM DATA RECEIVE KAR RAHE HAIN AS PROP
// WO ACTUALLY PRODUCT DATA HAI JO HUM BACKEND SE LE RAHE HAIN 
// AUR PHIR HUM USSE IS COMPONENT ME PASS KAR RAHE HAIN 
// AUR PHIR HUM USSE CARD FORMAT ME DISPLAY KAR RAHE HAIN


const ProductDetailsCard = ({setOpen, data}) => {
    const [count,setCount]=useState(1)
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(false)

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
    const shopAvatar = resolveImageUrl(data?.shop?.shop_avatar?.url || data?.shop?.shop_avatar);
    const shopName = data?.shop?.name || 'Unknown shop';







      const decrementCount = () => {
       if (count > 1) {
       setCount(count - 1);
    }
  };




  const incrementCount = () => {
    setCount(count + 1);
  };


  //actually data.price is simply of products but we used the productcard for events also so we used the data.discountPrice for events and data.discount_price for products so we used the nullish coalescing operator to check which one is present and then we used that one
  const displayPrice = data?.price ?? data?.discountPrice ?? data?.discount_price ?? 0;
  //same for soldCount we used the data.total_sell for products and data.sold_out for events so we used the nullish coalescing operator to check which one is present and then we used that one
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
                      <h5 className="pb-3 text-[15px]">({data?.shop.ratings}) Ratings</h5>
                    </div>

                </div>


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
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {displayPrice}$
                  </h3>
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
                            onClick={()=> setClick(!click)}
                            className="cursor-pointer"
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                        />
                        ) : (
                        <AiOutlineHeart
                            size={30}
                            onClick={()=> setClick(!click)}
                            className="cursor-pointer"
                            title="Add to wishlist"
                        />
                        )}
                    </div>

                </div> {/* closes increment and decrement buttons and tthe heart icon as well mean these were two divs and were flex display*/}

                
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
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