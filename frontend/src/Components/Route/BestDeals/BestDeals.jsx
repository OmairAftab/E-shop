import React, { useEffect, useState } from 'react'
import { productData } from '../../../Static/data'
import styles from '../../../Styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'

const BestDeals = () => {

    const [data,setData]=useState([])


    const {products, isLoading} = useSelector((state) => state.products);
  const featuredProducts = products && products.length !== 0 ? products : productData; //mean agar dynamic data hai to wo show kra do
                                                                                      //agar nhi hto static data show krao

    useEffect(()=>{

        const dddata= products && products.length !==0 ? products : productData;  //mean agar dynamic data hai to wo show kra do nhi to static data show krao
        const d=dddata && dddata.sort((a,b)=>(b.sold_out || b.total_sell)-(a.sold_out || a.total_sell))
        const firstFive=d.slice(0,5)
        setData(firstFive)

    },[])


  return (
    <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h1 className='text-center'>Best Deals</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {
            data && data.map((i,index)=>(
                <ProductCard data={i} key={index} />
            ))
        }
        
        </div>
    </div>
  )
}

export default BestDeals