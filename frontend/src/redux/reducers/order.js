import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    ShopOrders: [],     //this will manage all the orders of a single shop/seller
    orders: [],         //this will manage all the orders of a single user
}

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        // get all orders of a single user
        .addCase("getAllOrdersUserRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("getAllOrdersUserSuccess", (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase("getAllOrdersUserFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })







        //get all orders of a single shop/seller
        .addCase("getAllOrdersShopRequest",(state)=>{
            state.isLoading=true;
        })

        .addCase("getAllOrdersShopSuccess",(state,action)=>{
            state.isLoading=false;
            state.ShopOrders=action.payload;
        })

        .addCase("getAllOrdersShopFailed",(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })

        .addCase("clearError", (state) => {
            state.error = null;
        });
});