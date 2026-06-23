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