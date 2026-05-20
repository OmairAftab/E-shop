import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productData } from "../Static/data";
import styles from "../Styles/styles";
import ProductCard from "../Components/Route/ProductCard/ProductCard";

import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";


const BestSellingPage = () => {
 
    const [data, setData] = useState([]);



 useEffect(() => {

    const d= productData && productData.sort((a,b)=> b.total_sell - a.total_sell).slice(0,10);
    setData(d);

 } , [])  


  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">

          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}      {/* renders a ProductCard for each product */}

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BestSellingPage