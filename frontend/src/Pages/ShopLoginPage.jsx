import React from 'react'
import ShopLogin from '../Components/Shop/ShopLogin.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopLoginPage = () => {
    const navigate= useNavigate();
    const { isSeller, seller } = useSelector((state) => state.seller);


    // This useEffect hook checks if the seller is already authenticated. If they are, it redirects them to their shop's home page using their unique ID. This prevents logged-in sellers from accessing the shop login page, which is a common practice to enhance user experience and security.
    useEffect(() => {
        if (isSeller && seller) {
              navigate(`/shop/${seller._id}`);
            }
          }, [isSeller, seller, navigate])

  return (
    <ShopLogin />
  )
}

export default ShopLoginPage