import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from '../util/cartUtil';

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // // Calculate items price
            // state.itemPrice = addDecimals(
            //     state.cartItems.reduce(
            //         (acc, item) => acc + item.price * item.qty,
            //         0
            //     )
            // );

            // // Calculate shipping price
            // state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

            // // Calculate tax price
            // state.taxPrice = addDecimals(
            //     Number((0.15 * state.itemPrice).toFixed(2))
            // );

            // // Calculate total price
            // state.totalPrice = (
            //     Number(state.itemPrice) +
            //     Number(state.shippingPrice) +
            //     Number(state.taxPrice)
            // ).toFixed(2);

            // // Save to local storage
            // localStorage.setItem("cart", JSON.stringify(state));

            // Update the cart state using the updateCart function
            return updateCart(state, item);

        },
        removeFromCart: (state, action) => { 
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
    },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions; 

export default cartSlice.reducer;
