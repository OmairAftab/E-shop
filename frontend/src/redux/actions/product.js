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
        console.log('getAllProductsShop response:', data) //isko print kr k dekha data aa rha . and is main 2 cheezen aa rhi theen products: phir aik object jis main prdoucts the and success:true 
                                                          //and basically ye dono cheezen hum ne jo /get-all-products-shop/id wala jo route bnaya hai na product k controller main wo ja k dekho .. 
                                                          // jb wo successful hota hai to jo prdoucts find kiye hon wo returen kr rha hai and and success:true
        dispatch({
            type:"getAllProductsShopSuccess",
            payload:data.products  //upar se jo data hum ne get kiya axios ki request kr k phir jo humen products receive hue wo hum ne payload main dal diye
                                //and phir jo getAllProductsShopSuccess wala jo reducer hai wo is payload ko state main dal dega and phir hum useSelector k zariye us state ko access kr sakte hain
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






//delete a product of a shop
export const deleteProduct=(id)=> async(dispatch)=>{
    try{
        dispatch({
            type:"deleteProductRequest"
        })

        const {data}=await axios.delete(`${server}/product/delete-shop-product/${id}`,{withCredentials:true})
        dispatch({
            type:"deleteProductSuccess",
            payload:{
                message:data.message,
                id,
            }
        })
        return data
    }
    catch(error){
        dispatch({
            type:"deleteProductFailed",
            payload:error.response?.data?.message || error.message,
        })
        throw error
    }
}


// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest",
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response?.data?.message || error.message,
        });
    }
};