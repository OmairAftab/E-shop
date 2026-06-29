export const addToWishlist= (data) => async (dispatch, getState) =>{
    try{
        dispatch({
            type:"addToWishlist",
            payload: data
        });

        localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
        return data;

    }
    catch(error){
        console.log("addToWishlist error:", error);
    }
}



//remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
    try{
        dispatch({
            type: "removeFromWishlist",
            payload: data._id,
        });
        localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
        return data;
    }
    catch(error){
        console.log("removeFromWishlist error:", error);
    }
}