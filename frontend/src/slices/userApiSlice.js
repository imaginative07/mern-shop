import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        })
    }),
});

export const { useLoginMutation, useLogoutMutation } = userApiSlice;