import React from 'react'
import { productData } from '../../../Static/data'
import styles from '../../../Styles/styles'
import ProductCard from '../ProductCard/ProductCard'

const FeaturedProducts = () => {
  return (
    <div className='mt-7'>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className='text-center'>Featured Products</h1>
        </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            
            {
                productData && productData.map((i,index)=>(
                    <ProductCard data={i} key={index} />
                ))
            } 

            </div>


     </div>
    </div>
  )
}

export default FeaturedProducts