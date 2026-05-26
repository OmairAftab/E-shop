import React, { use } from 'react'
import Header from '../Components/Layout/Header'
import ProductDetail from '../Components/Products/ProductDetail'
import Footer from '../Components/Layout/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { productData } from '../Static/data'

// in the product detail page we got the name of product from parameter
//  , find that product name in our db of that product then set it to data.. 
// then send that data to ProductDetail coponent and just style and show it there

const ProductsDetailPage = () => {

    const {name} = useParams();
    const [data,setData]=useState(null);
    const productName=name.replace(/-/g," ");   // jahan url main - lgi a hai usko space se replace krna hai taki product name match kr ske db se


    // finds the product from productData whose name matches productName and saves it to state.
    useEffect(()=>{
        const data=productData.find((item)=> item.name.toLowerCase() === productName.toLowerCase());
        setData(data);
    },[])

  return (
    <div>
      <Header />
      <ProductDetail data={data} />
      <Footer/>
    </div>
  )
}

export default ProductsDetailPage