import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnsedDataFor:5,
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
            }),
        }),
        keepUnsedDataFor:5,

        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: "POST",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { useGetProductQuery, useGetProductDetailsQuery, useCreateProductMutation } = productApiSlice;