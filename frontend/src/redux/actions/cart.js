// add to cart
export const addTocart = (data) => async (dispatch, getState) => {

  try{

    dispatch({
      type: "addToCart",
      payload: data,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart)); //getState().cart.cart — reads the current Redux state. getState() returns your entire store ({ user: {...}, seller: {...}, products: {...}, cart: {...} }). The first .cart picks out the cart slice (managed by cartReducer). The second .cart is the actual array field inside that slice (remember cartReducer's shape: { cart: [...] }). Two .carts because the store key and the field name happen to be the same word
                                                                            //JSON.stringify(...) — converts the JS array into a plain text string, because localStorage can only store strings, not real JS objects/arrays. 
                                                                            //  localStorage.setItem("cartItems", ...) — saves that string under the key "cartItems", so it survives page refreshes (this is exactly what your reducer's initialState reads back with JSON.parse(localStorage.getItem("cartItems"))).
    return data;
}
catch (error) {
    console.log("addTocart error:", error);
  }
};



// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {

  try{
    dispatch({
      type: "removeFromCart",
      payload: data._id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  }
catch (error) {
    console.log("removeFromCart error:", error);
  }
};