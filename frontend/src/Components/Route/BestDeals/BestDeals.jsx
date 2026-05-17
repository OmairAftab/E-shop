import React, { useEffect, useState } from 'react'
import { productData } from '../../../Static/data'
import styles from '../../../Styles/styles'
import ProductCard from '../ProductCard/ProductCard'

const BestDeals = () => {

    const [data,setData]=useState([])




    useEffect(()=>{

        const d=productData&&productData.sort((a,b)=>b.total_sell-a.total_sell)
        const firstFive=d.slice(0,5)
        setData(firstFive)

    },[])


  return (
    <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h1>Best Deals</h1>
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