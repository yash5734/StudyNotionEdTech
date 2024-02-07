import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems: (state, value) => {
            state.totalItems = value.payload;
        },

        // HW: add to cart and remove from cart and reset cart
        addToCart: (state, value) => {
            state.cartItems.push(value.payload);
        },
        removeFromCart: (state, value) => {
            
        },
        resetCart: (state, value)=>{
            state.cartItems = [];
        }
    }
})

export const { setTotalItems,addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer