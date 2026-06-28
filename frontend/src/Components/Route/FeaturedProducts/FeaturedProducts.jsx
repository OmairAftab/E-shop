import React from 'react'
import styles from '../../../Styles/styles'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { productData } from '../../../Static/data'

const FeaturedProducts = () => {

  const { allProducts } = useSelector((state) => state.products);
  const featuredProducts = allProducts;


  return (
    
    <div className='mt-7'>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className='text-center'>Featured Products</h1>
        </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            
             {
            featuredProducts && featuredProducts.length !== 0 &&(
              <>
               {featuredProducts && featuredProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           } 

            </div>


     </div>
    </div>
  )
}

export default FeaturedProducts