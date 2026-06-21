import React from 'react'
import CreateShopComponent from '../Components/Shop/CreateShopComponent'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateShopPage = () => {

   const navigate= useNavigate();
    const { isSeller, seller } = useSelector((state) => state.seller);


    // This useEffect hook checks if the seller is already authenticated. If they are, it redirects them to their shop's home page using their unique ID. This prevents logged-in sellers from accessing the shop login page, which is a common practice to enhance user experience and security.
    useEffect(() => {
        if (isSeller) {
          navigate(`/shop/${seller._id}`);  
        }
      }, [])

  return (
    <div>
        <CreateShopComponent />
    </div>
  )
}

export default CreateShopPage