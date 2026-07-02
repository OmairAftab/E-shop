import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    orders: [],
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

        .addCase("clearError", (state) => {
            state.error = null;
        });
});