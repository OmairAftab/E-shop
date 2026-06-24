import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsShop } from '../../redux/actions/product.js'

const AllProductsOfASingleShop = () => {

 const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
  if (seller && seller._id) {
    dispatch(getAllProductsShop(seller._id));
  }
}, [dispatch, seller]);


    console.log(products && products)
  return (
    <div> </div>
  )
}

export default AllProductsOfASingleShop