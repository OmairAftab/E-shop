import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productData } from "../Static/data";
import styles from "../Styles/styles";
import ProductCard from "../Components/Route/ProductCard/ProductCard";

import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";


const BestSellingPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    const productsSource = allProducts && allProducts.length !== 0 ? allProducts : productData;
    const sortedData = [...productsSource].sort((a, b) => {
      const aSold = a.sold_out ?? a.total_sell ?? 0;
      const bSold = b.sold_out ?? b.total_sell ?? 0;
      return bSold - aSold;
    });
    setData(sortedData);
  }, [allProducts]);


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