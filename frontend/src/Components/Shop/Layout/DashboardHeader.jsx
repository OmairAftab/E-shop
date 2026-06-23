import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  console.log("Seller data in DashboardHeader:", seller);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
     
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>


      <div className="flex items-center">
        <div className="flex items-center mr-4">

          
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>


          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>


          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>


          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>


          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>



        {/*  wait until seller data loads, else seller._id crashes */}
          {seller ? (
            <Link to={`/shop/${seller._id}`}>
              <img
                src={(() => {
                  const url = seller.avatar?.url;
                  if (!url) return "/logo192.png";
                  if (url.startsWith("http") || url.startsWith("data:")) return url;
                  return `${backend_url}${url.startsWith("/") ? url.slice(1) : url}`;
                })()}
                alt={seller.name || "Seller"}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/shop-login" className="800px:block hidden">
              <div className="w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {/* simple placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1119.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </Link>
          )}


        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;