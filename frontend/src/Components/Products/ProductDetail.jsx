import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";  // ✅ added AiOutlineShoppingCart
import { AiFillStar, AiOutlineStar, AiOutlineMessage } from "react-icons/ai";
import { backend_url } from '../../server';

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


const ProductDetail = ({ data }) => {

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => { if (count > 1) setCount(count - 1); };

  const images = [];
  if (Array.isArray(data?.images)) {
    data.images.forEach(img => {
      const resolved = resolveImageUrl(img);
      if (resolved) images.push(resolved);
    });
  }
  if (Array.isArray(data?.image_Url)) {
    data.image_Url.forEach(img => {
      const resolved = resolveImageUrl(img);
      if (resolved) images.push(resolved);
    });
  }
  if (images.length === 0) {
    if (data?.image_Url) {
      const resolved = resolveImageUrl(data.image_Url);
      if (resolved) images.push(resolved);
    }
    if (data?.image) {
      const resolved = resolveImageUrl(data.image);
      if (resolved) images.push(resolved);
    }
  }

  const activePrice = data?.discountPrice ?? data?.price ?? data?.discount_price ?? 0;
  const originalPrice = data?.originalPrice ?? data?.original_price;
  const shopAvatar = resolveImageUrl(data?.shop?.avatar);

  return (
    <div className="bg-white">
      {data ? (
        <>
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">

                {/* LEFT SIDE — images */}
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={images[select] || 'https://via.placeholder.com/400'}
                    alt=""
                    className="w-[80%] h-[400px] object-contain"
                  />

                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, index) => (
                      <div 
                        key={index} 
                        className={`cursor-pointer border ${select === index ? 'border-teal-500' : 'border-gray-300'}`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-[90px] w-[90px] object-cover mr-2 mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>  {/* closes left side */}

                {/* RIGHT SIDE — product info */}
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
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

                  {/* counter + wishlist */}
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

                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          color="red"
                          title="Remove from wishlist"
                          onClick={() => setClick(false)}
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          color="#333"
                          title="Add to wishlist"
                          onClick={() => setClick(true)}
                        />
                      )}
                    </div>
                  </div>  {/* closes counter + wishlist */}

                  {/* add to cart button */}
                  <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}>
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>

                  {/* shop info */}
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <img
                        src={shopAvatar || 'https://via.placeholder.com/50'}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-[15px] flex items-center">
                         Rating: {data.shop.ratings} <AiFillStar color="#f6ba00" size={20} className="ml-1" />
                      </h5>

                    </div>


                    {/* message button:  */}
                    <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    // onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>



                  </div>  {/* closes shop info */}

                </div>  {/*  closes right side */}

              </div>  {/*  closes block w-full 800px:flex */}
            </div>  {/*  closes w-full py-5 */}
          </div>  {/*  closes styles.section */}

        
            
            <ProductDetailInfo data={data} />        {/*Component is made below.. its for Silver color section which has 3 parts.. */}

        </>
      ) : null}
    </div>
  )
}


const ProductDetailInfo= ({data})=>{
    const [active, setActive] = useState(1);
    const infoShopAvatar = resolveImageUrl(data?.shop?.avatar);

    return (

        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-8 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">

                {/* DIV FOR PRODUCT DETAILS TAB */}
                <div className="relative">

                    <h5
                        className={
                        "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>


                     {active === 1 ? (
                        <div className={`${styles.active_indicator}`} />   // ye neeche wali line hai jo active tab ke neeche aayegi
                    ) : null}

                </div> 
                {/* END OF DIV FOR PRODUCT DETAILS TAB */}




                {/* DIV FOR PRODUCT REVIEWS TAB */}
                <div className="relative">
                    <h5
                        className={
                        "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                {/* END OF DIV FOR PRODUCT REVIEWS TAB */}






                {/* DIV FOR SELLER INFORMATION TAB */}
                <div className="relative">
                    <h5
                        className={
                        "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(3)}
                    >
                        Seller Information
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                {/* END OF DIV FOR SELLER INFORMATION TAB */}



            </div>




            {/* PRODUCT DETAIL TAB MAIN JO PRODUCT HAI US KI INFORMATION DAAL DI BY data.description */}
            {active === 1 ? (
                    <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        {data.description}
                    </p>
                    </>
            ) : null}




            {/* PRODUCT REVIEWS TAB */}
            {
                active === 2 ? (
                    <div className="w-full py-8 flex items-center justify-center">
                        <h5 className="text-[18px]">No reviews yet!</h5>
                    </div>
                ) : null
            }




            {/* SELLER INFORMATION TAB */}
            {   active === 3 ? (
                    <div className="w-full block 800px:flex items-start px-2 py-5 gap-6">

                    {/* left side — shop info */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            <img
                                src={infoShopAvatar || 'https://via.placeholder.com/50'}
                                className="w-[50px] h-[50px] rounded-full"
                                alt=""
                            />
                            <div className="pl-3">
                                <h3 className={`${styles.shop_name}`}>
                                    {data?.shop?.name}
                                </h3>
                                <h5 className="pb-2 text-[15px] flex items-center">
                                    Rating: {data?.shop?.ratings} <AiFillStar color="#f6ba00" size={20} className="ml-1" />
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* right side — shop description starts right after left side ends */}
                    <div className="flex-1">
                        <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                            {data?.shop?.description  || 'No seller description available.'}
                        </p>
                    </div>

                </div>
                ) : null
                }




        </div>
    )
}

export default ProductDetail