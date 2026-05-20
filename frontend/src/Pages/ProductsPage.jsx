import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productData } from "../Static/data";
import styles from "../Styles/styles";
import ProductCard from "../Components/Route/ProductCard/ProductCard";

import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
 const [data, setData] = useState([]);

 useEffect(() => {
  if(categoryData===null){                                              /// if no category in URL → sort all products by total_sell and show top 10
    const d= productData && productData.sort((a,b)=> a.total_sell - b.total_sell).slice(0,10);
    setData(d);
  }
  else{                                                                 // // if category exists in URL → filter and show only products of that category
    const d= productData && productData.filter(i=> i.category === categoryData);
    setData(d);
  }

  // window.scrollTo(0,0);

 } , [])  


  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">

          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}      {/* renders a ProductCard for each product */}

        </div>
        {data && data.length === 0 ? (                                                
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!                                                   {/* if no products of that category exists, show this message */}
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  )
}

export default ProductsPage