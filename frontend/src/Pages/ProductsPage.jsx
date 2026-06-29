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
   //useSearchParams reads the query string from the current URL — the part after ?. So if the URL is
  // http://localhost:3000/products?category=electronics, then searchParams.get("category") will return "electronics"
  //then categoryData becomes the string "Electronics".
  const categoryData = searchParams.get("category");
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);



  useEffect(() => {
    const productsSource = allProducts && allProducts.length !== 0 ? allProducts : [];
    if(categoryData===null){
      const d = [...productsSource].sort((a,b) => {
        const aSold = a.sold_out ?? 0;
        const bSold = b.sold_out ?? 0;
        return aSold - bSold;  //t sorts in ascending order — least-sold products first, best-sellers last
      });
      setData(d);
    }
    else{
      const d = productsSource.filter(i => i.category === categoryData); //This filters down to only products whose category field matches the URL's category exactly..
      setData(d);
    }
  } , [allProducts, categoryData])  




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




//        SUMMARY:
// Page loads → reads ?category= from URL
//         ↓
// allProducts comes from Redux store
//         ↓
// useEffect runs whenever allProducts or categoryData changes:
//     - no category in URL → sort ALL products by sales (ascending)
//     - category in URL    → filter products matching that category
//         ↓
// Result saved to local `data` state
//         ↓
// Grid renders one ProductCard per item in `data`
//         ↓
// If data is empty → show "No products Found!" message instead