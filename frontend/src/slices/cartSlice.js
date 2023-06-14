import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

// Helper function to add decimals to the prices
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.id === item.id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price
            state.itemPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                )
            );

            // Calculate shipping price
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

            // Calculate tax price
            state.taxPrice = addDecimals(
                Number((0.15 * state.itemPrice).toFixed(2))
            );

            // Calculate total price
            state.totalPrice = (
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            // Save to local storage
            localStorage.setItem("cart", JSON.stringify(state));

        },
    },
});

export const { addToCart } = cartSlice.actions; 

export default cartSlice.reducer;
