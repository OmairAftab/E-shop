import axios from "axios";
import { server } from "../../server";




//create product action
export const createProduct = (formData) => async (dispatch) => {
    try{
        dispatch({
            type:"productCreateRequest"
        })

        const config={ withCredentials:true }
        const {data}=await axios.post(`${server}/product/create-product`,formData,config)

        
        dispatch({
            type:"productCreateSuccess",
            payload:data.product
        })

    }
    catch(error){
        dispatch({
            type:"productCreateFailed",
            payload:error.response.data.message
        })
    }

}










// get all products of a single shop
export const getAllProductsShop = (id) => async (dispatch) => {
    try{
        dispatch({
            type:"getAllProductsShopRequest"
        })

        const {data}=await axios.get(`${server}/product/get-all-products-shop/${id}`)
        console.log('getAllProductsShop response:', data)
        dispatch({
            type:"getAllProductsShopSuccess",
            payload:data.products
        })
    }
    catch(error){
        console.log('getAllProductsShop error:', error.response?.data || error.message || error)
        dispatch({
            type:"getAllProductsShopFailed",
            payload:error.response?.data?.message || error.message,
        })
    }

}