import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";  // ✅ added AiOutlineShoppingCart
import { AiFillStar, AiOutlineStar, AiOutlineMessage } from "react-icons/ai";


const ProductDetail = ({ data }) => {

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => { if (count > 1) setCount(count - 1); };

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
                    src={data.image_Url[select].url}
                    alt=""
                    className="w-[80%] h-[400px] object-contain"
                  />

                  <div className="flex">
                    <div className="cursor-pointer">
                      <img
                        src={data.image_Url[0].url}
                        alt=""
                        className="h-[200px] overflow-hidden mr-3 mt-3 border"
                        onClick={() => setSelect(0)}
                      />
                    </div>

                    {data.image_Url[1].url && (
                      <div className="cursor-pointer">
                        <img
                          src={data.image_Url[1].url}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3 border"
                          onClick={() => setSelect(1)}
                        />
                      </div>
                    )}
                  </div>
                </div>  {/* closes left side */}

                {/* RIGHT SIDE — product info */}
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>

                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price ? data.price + "$" : null}
                    </h3>
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
                        src={`${data?.shop?.shop_avatar?.url}`}
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
        </>
      ) : null}
    </div>
  )
}

export default ProductDetail