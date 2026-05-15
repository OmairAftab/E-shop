import React, { useState, useEffect, useMemo } from 'react'
import styles from "../../Styles/styles";
import { categoriesData, productData } from "../../Static/data";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";


const Header = ({ activeHeading }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  // const { allProducts } = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchData([]);
      return;
    }




    const termLower = term.toLowerCase();                                                    // converts search term to lowercase for case-insensitive comparison

    const normalized = (productData || []).reduce((acc, p) => {                         // loops through productData (uses [] if productData is null/undefined)
      const name = (p.name || "").trim();                                                // gets product name, uses empty string if null, removes extra spaces
      if (!name) return acc;                                                             // skips this product if name is empty
      const key = name.toLowerCase();                                                    // converts name to lowercase to use as unique key
      if (!acc.map.has(key)) {                                                           // checks if this product name already exists in map (prevents duplicates)
        acc.map.set(key, true);                                                          // adds name to map to mark it as seen
        acc.list.push({                                                                  // adds product to list with only needed fields
          id: p._id || p.id,                                                            // uses _id (mongodb) or id whichever exists
          name,                                                                          // product name
          image: p.image_Url?.[0]?.url || p.images?.[0]?.url || p.image_Url || "https://via.placeholder.com/40", // gets image url, tries two possible field names, falls back to placeholder
        });
      }
      return acc;                                                                        // returns accumulator for next iteration
    }, { map: new Map(), list: [] }).list;                                               // starts with empty map and list, gets only .list at the end

    const filtered = normalized.filter((p) => p.name.toLowerCase().includes(termLower)); // keeps only products whose name contains the search term
    setSearchData(filtered.slice(0, 10));                                                // saves max 10 results to state to show in dropdown





  };




  

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <>
    

    <div className="flex w-11/12 mx-auto justify-around">

    <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">

      <Link to="/">
      <img
        src="/shop.png"
        alt="Logo"
        className="h-[139px]  w-auto object-contain" 
      />
    </Link>


     </div>

     {/* search term */}

    <div className="w-[50%] relative mt-5">

        <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchTerm.trim().length > 0 && (
              <div className="absolute w-full max-h-60 overflow-y-auto bg-white shadow z-50 p-2 mt-1 rounded">
                {searchData && searchData.length > 0 ? (
                  searchData.slice(0, 10).map((i, index) => (
                    <Link
                      to={`/product/${i._id || i.id}`}
                      // to={`/product/${Product_name}`}
                      key={i._id || i.id || index}
                      onClick={() => {
                        setSearchTerm(i.name);
                        setSearchData([]);
                      }}
                    >
                      <div className="w-full flex items-center py-2 hover:bg-gray-100 rounded px-2">
                        <img
                          src={
                            i.image_Url?.[0]?.url || i.images?.[0]?.url || 
                            "https://via.placeholder.com/40"
                          }
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px] object-cover"
                        />
                        <h1 className="text-sm">{i.name}</h1>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="py-2 px-2 text-sm text-gray-500">No products found</div>
                )}
              </div>
            )}
     </div>




     <div className={`${styles.button}`}>
            <Link to="/seller">
            
              <h1 className='text-[#fff] flex items-center' >
                Become Seller <IoIosArrowForward className='ml-1' />
              </h1>
            </Link>

     </div>
 {/* END OF UPAR WALA NAVBAr */}





     

     

    </div>


    <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-50" : ""} transition w-full`}> 
      <div className="flex items-center justify-between w-full bg-[#3321c8] h-[70px]">
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>


               <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}


            </div>
          </div>

          {/* blue wala nabar k andar items  */}
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>







          {/* blue navbar k right most pe jo 3 hain icons */}
            <div className="flex"> {/* search icon with badge */}
            <div className={`${styles.noramlFlex}`}> {/* heart icon with badge */}
              <div
                className="relative cursor-pointer mr-[15px]"
                
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div> {/* closes the heart icon div */}




              {/* search icon */}
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div> {/* closes the cart icon div */}





              {/* profile icon */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                
              </div>
            </div>  {/* closes the icons div */}

        </div> {/* closes the styles.section div with class flex which contain these 3 icons at right end (heart,shopping and profile) */}




       </div>   {/* closes styles.section */}
      </div>     {/* closes flex items-center bg-[#3321c8] */}
    </div>       {/* ✅ closes the sticky active div — this was missing */}
      
</>

   
  )
}

export default Header