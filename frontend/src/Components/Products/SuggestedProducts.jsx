import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../Static/data";
import styles from "../../Styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProducts = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    //JIN PRODUCTS KI CATEGORY HUMARE DATA KI CATEGORY KE BARABAR HAI AUR JINKE ID HUMARE DATA KE ID KE BARABAR NA HO(mean same product related product main show nhi krni ) UNHE FILTER KARKE setdata() kr rhe mean data set kr diya and neeche for each data hum ne product card component ko call kiya aur data pass kiya jisse product card component me data show ho jaye
    const d = allProducts.filter((i) => i.category === data.category && (i._id !== data._id));
    setProducts(d);
  }, [allProducts, data]);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             
             {/* //agar koi same category ka product na ho toh show kro nahi toh no products found */}
            { products && products.length === 0 && (
                <h5 className="w-full text-center py-5 text-[18px]">
                    No Related Items Found
                </h5>
             )}


             {
                products && products.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
             
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProducts;
