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
import { backend_url } from "../../server";
import Cart from '../Cart/cart';
import { RxCross1 } from 'react-icons/rx';
import Wishlist from '../Wishlist/wishlist';
import { useDispatch } from 'react-redux';


const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const { allProducts } = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchData([]);
      return;
    }

    const termLower = term.toLowerCase();

    const normalized = (allProducts || []).reduce((acc, p) => {
      const name = (p.name || "").trim();
      if (!name) return acc;
      const key = name.toLowerCase();
      if (!acc.map.has(key)) {
        acc.map.set(key, true);

        let resolvedImage = "https://via.placeholder.com/40";
        const rawImg = p.images?.[0] || p.image_Url?.[0]?.url || p.image_Url;
        if (rawImg) {
          if (typeof rawImg === 'string') {
            if (rawImg.startsWith('http://') || rawImg.startsWith('https://') || rawImg.startsWith('data:')) {
              resolvedImage = rawImg;
            } else if (rawImg.startsWith('/')) {
              resolvedImage = `${backend_url}${rawImg.slice(1)}`;
            } else {
              resolvedImage = `${backend_url}uploads/${rawImg}`;
            }
          } else if (typeof rawImg === 'object' && rawImg.url) {
            resolvedImage = rawImg.url;
          }
        }

        acc.list.push({
          id: p._id || p.id,
          name,
          image: resolvedImage,
        });
      }
      return acc;
    }, { map: new Map(), list: [] }).list;

    const filtered = normalized.filter((p) => p.name.toLowerCase().includes(termLower));
    setSearchData(filtered.slice(0, 10));
  };

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const avatarSrc = useMemo(() => {
    const url = user?.avatar?.url;
    if (!url) return "/logo192.png";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    return `${backend_url}${url.startsWith("/") ? url.slice(1) : url}`;
  }, [user]);

  return (
    <>
      {loading ? null : (
        <>
          {/* ── Desktop Top Bar ── */}
          <div className="hidden 800px:flex w-11/12 mx-auto justify-around">
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
              <Link to="/">
                <img
                  src="/shop.png"
                  alt="Logo"
                  className="h-[139px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* Search */}
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
                        key={i._id || i.id || index}
                        onClick={() => {
                          setSearchTerm(i.name);
                          setSearchData([]);
                        }}
                      >
                        <div className="w-full flex items-center py-2 hover:bg-gray-100 rounded px-2">
                          <img
                            src={i.image}
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

            {/* Become Seller / Dashboard button */}
            <div className={`${styles.button}`}>
              {isSeller ? (
                <Link to="/dashboard">
                  <h1 className="text-[#fff] flex items-center">
                    Dashboard <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              ) : (
                <Link to="/create-shop">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              )}
            </div>
          </div>

          {/* ── Desktop Blue Navbar ── */}
          <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-50" : ""} transition w-full hidden 800px:block`}>
            <div className="flex items-center justify-between w-full bg-[#3321c8] h-[70px]">
              <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>

                {/* Categories dropdown */}
                <div>
                  <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                    <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                    <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
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

                {/* Nav links */}
                <div className={`${styles.noramlFlex}`}>
                  <Navbar active={activeHeading} />
                </div>

                {/* Right icons — wishlist, cart, profile */}
                <div className="flex">

                  {/* Wishlist */}
                  <div className={`${styles.noramlFlex}`}>
                    <div
                      className="relative cursor-pointer mr-[15px]"
                      onClick={() => setOpenWishlist(true)}
                    >
                      <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {wishlist && wishlist.length}
                      </span>
                    </div>
                  </div>

                  {/* Cart */}
                  <div className={`${styles.noramlFlex}`}>
                    <div
                      className="relative cursor-pointer mr-[15px]"
                      onClick={() => setOpenCart(true)}
                    >
                      <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {cart && cart.length}
                      </span>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className={`${styles.noramlFlex}`}>
                    <div className="relative cursor-pointer mr-[15px]">
                      {isAuthenticated ? (
                        <Link to="/profile">
                          <img
                            src={avatarSrc}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/logo192.png";
                            }}
                            className="w-[35px] h-[35px] rounded-full"
                            alt="user avatar"
                          />
                        </Link>
                      ) : (
                        <Link to="/login">
                          <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                        </Link>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile Header ── */}
          <div
            className={`${
              active === true ? "fixed top-0 left-0 z-50 shadow-sm" : ""
            } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
          >
            <div className="w-full flex items-center justify-between px-4 h-full">
              <div>
                <BiMenuAltLeft
                  size={40}
                  className="cursor-pointer text-[#333]"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Link to="/">
                  <img
                    src="/shop.png"
                    alt="Logo"
                    className="h-[50px] w-auto object-contain cursor-pointer"
                  />
                </Link>
              </div>
              <div>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart size={30} className="text-[#333]" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Drawer */}
            {open && (
              <div className="fixed w-full h-full bg-[#00000030] z-50 top-0 left-0" onClick={() => setOpen(false)}>
                <div 
                  className="fixed w-[75%] sm:w-[60%] bg-[#fff] h-screen top-0 left-0 z-50 overflow-y-auto shadow-2xl flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className="w-full flex justify-between items-center p-4 border-b border-gray-100">
                      <div
                        className="relative mr-[15px] cursor-pointer"
                        onClick={() => {
                          setOpenWishlist(true);
                          setOpen(false);
                        }}
                      >
                        <AiOutlineHeart size={30} className="text-[#333]" />
                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                          {wishlist && wishlist.length}
                        </span>
                      </div>
                      <RxCross1
                        size={30}
                        className="cursor-pointer text-gray-700 hover:text-black transition"
                        onClick={() => setOpen(false)}
                      />
                    </div>

                    {/* Search inside drawer */}
                    <div className="px-4 my-4 relative">
                      <input
                        type="text"
                        placeholder="Search Product..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="h-[40px] w-full px-3 border-[#3957db] border-[2px] rounded-md text-sm outline-none"
                      />
                      <AiOutlineSearch
                        size={25}
                        className="absolute right-6 top-2 cursor-pointer text-gray-500"
                      />
                      {searchTerm.trim().length > 0 && (
                        <div className="absolute w-[calc(100%-2rem)] max-h-60 overflow-y-auto bg-white shadow-lg z-50 p-2 mt-1 rounded border border-gray-100">
                          {searchData && searchData.length > 0 ? (
                            searchData.map((i, index) => (
                              <Link
                                to={`/product/${i._id || i.id}`}
                                key={i._id || i.id || index}
                                onClick={() => {
                                  setSearchTerm(i.name);
                                  setSearchData([]);
                                  setOpen(false);
                                }}
                              >
                                <div className="w-full flex items-center py-2 hover:bg-gray-100 rounded px-2">
                                  <img
                                    src={i.image}
                                    alt=""
                                    className="w-[40px] h-[40px] mr-[10px] object-cover rounded"
                                  />
                                  <h1 className="text-sm text-gray-800 font-medium">{i.name}</h1>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <div className="py-2 px-2 text-sm text-gray-500">No products found</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Nav links */}
                    <div className="mt-6 px-4">
                      <Navbar active={activeHeading} />
                    </div>
                  </div>

                  {/* Drawer footer */}
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex w-full justify-center mb-6">
                      {isSeller ? (
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                          <div className="w-[150px] bg-black h-[45px] flex items-center justify-center rounded-xl cursor-pointer">
                            <h1 className="text-[#fff] flex items-center text-sm font-medium">
                              Dashboard <IoIosArrowForward className="ml-1" />
                            </h1>
                          </div>
                        </Link>
                      ) : (
                        <Link to="/create-shop" onClick={() => setOpen(false)}>
                          <div className="w-[150px] bg-black h-[45px] flex items-center justify-center rounded-xl cursor-pointer">
                            <h1 className="text-[#fff] flex items-center text-sm font-medium">
                              Become Seller <IoIosArrowForward className="ml-1" />
                            </h1>
                          </div>
                        </Link>
                      )}
                    </div>

                    <div className="flex w-full justify-center">
                      {isAuthenticated ? (
                        <Link to="/profile" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                          <img
                            src={avatarSrc}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/logo192.png";
                            }}
                            className="w-[40px] h-[40px] rounded-full border border-gray-300 object-cover"
                            alt="user avatar"
                          />
                          <span className="text-gray-800 font-semibold text-sm">
                            {user?.name || "My Profile"}
                          </span>
                        </Link>
                      ) : (
                        <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-black font-semibold" onClick={() => setOpen(false)}>
                          <CgProfile size={30} className="text-gray-600" />
                          <span className="text-sm">Login / Register</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div> {/* ✅ closes mobile header div — was missing, caused the crash */}

          {/* Cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* Wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}

        </>
      )}
    </>
  );
};

export default Header;