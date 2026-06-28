import React, { useEffect, useState } from 'react'
import Header from '../Components/Layout/Header'
import ProductDetail from '../Components/Products/ProductDetail'
import Footer from '../Components/Layout/Footer'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { productData } from '../Static/data'
import SuggestedProducts from '../Components/Products/SuggestedProducts'

// in the product detail page we got the name of product from parameter
//  , find that product name in our db of that product then set it to data.. 
// then send that data to ProductDetail coponent and just style and show it there

const ProductsDetailPage = () => {

    const {name} = useParams();
    const { allProducts } = useSelector((state) => state.products);
    const [data,setData]=useState(null);


    // finds the product from allProducts or productData whose ID or name matches the parameter
    useEffect(()=>{
        const productsSource = allProducts && allProducts.length !== 0 ? allProducts : productData;
        
        // Try to find by ID first (in case name is an ID)
        let foundProduct = productsSource.find((item) => (item._id || item.id) === name);
        
        // If not found by ID, try to find by name (replacing dashes with spaces)
        if (!foundProduct) {
            const productName = name.replace(/-/g, " ");
            foundProduct = productsSource.find((item) => item.name.toLowerCase() === productName.toLowerCase());
        }

        setData(foundProduct);
    },[allProducts, name])

  return (
    <div>
      <Header />
      <ProductDetail data={data} />
      {
        data && <SuggestedProducts data={data} />
      }
      <Footer/>
    </div>
  )
}

export default ProductsDetailPage