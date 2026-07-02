import axios from "axios";
import { server } from "../../server.js";






//get all orders of a user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
try{

    dispatch({
        type: "getAllOrdersUserRequest"
    })

    const { data } = await axios.get(`${server}/order/get-all-orders/user/${userId}`, { withCredentials: true });
    
    dispatch({
        type:"getAllOrdersUserSuccess",
        payload:data.orders
    })
}
catch(err){
    dispatch({
        type:"getAllOrdersUserFailed",
        payload:err.response.data.message
    })
}

}