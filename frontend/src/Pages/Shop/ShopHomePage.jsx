import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ShopHomePage = () => {
    const [isLoading, isSeller, seller] = useSelector((state) => state.seller);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading===false && !isSeller) {
          navigate('/shop-login');
        }
    }, [isSeller, navigate]);


  return (
    <div>ShopHomePage</div>
  )
}

export default ShopHomePage