import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
}

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("productCreateRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("productCreateSuccess", (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
            state.success = true;
        })
        .addCase("productCreateFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        // get all products of a single shop
        .addCase("getAllProductsShopRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("getAllProductsShopSuccess", (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase("getAllProductsShopFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase("clearError", (state) => {
            state.error = null;
        });
});