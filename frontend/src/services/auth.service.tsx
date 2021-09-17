import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../config";

interface Credentials {
    username: string;
    password: string;
}

interface AuthResult {
    status: string;
    data: {
        token: string;
    };
}

export const apiSlice = createApi({
    reducerPath: "api/auth",
    baseQuery: fetchBaseQuery({ baseUrl: Config.baseUrl + "auth" }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResult, Credentials>({
            query: (credentials) => ({
                url: "/signup",
                method: "POST",
                body: credentials,
            }),
        }),
        login: builder.mutation<AuthResult, Credentials>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = apiSlice;
