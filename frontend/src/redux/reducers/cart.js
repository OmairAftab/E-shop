import { createReducer } from "@reduxjs/toolkit";

//INITIAL STATE: 
// This decides what the cart looks like the very first time your app loads. It checks localStorage (the browser's permanent storage that survives page refreshes):
// If "cartItems" exists in localStorage (meaning the user added stuff to their cart before, in a previous visit) → parse that saved JSON string back into a real array, and use it as the starting cart.
// If nothing's saved yet → start with an empty array [].
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;                                     // the product being added
      const isItemExist = state.cart.find((i) => i._id === item._id);  // does this exact item already exist in the cart?


      if (isItemExist) {
        // item already in cart → replace it (e.g. updated quantity/info)
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        // item not in cart yet → just add it to the end
        state.cart.push(item);
      }
    })



    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});
// .filter() walks through every item in state.cart, one at a time, and builds a new array containing only the items where the condition inside is true.
// The condition here is:
// i._id !== action.payload
// What is action.payload here? Go back to your removeFromCart action:
// export const removeFromCart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "removeFromCart",
//     payload: data._id,   // ← just the ID string, not the whole product object
//   });
//   so it will make a new array of all items whose _id does NOT match the ID of the item we want to remove. The item with that ID is effectively removed from the cart.
// };