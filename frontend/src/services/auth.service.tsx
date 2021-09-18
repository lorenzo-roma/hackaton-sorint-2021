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

console.log(Config.baseUrl);
export const apiSlice = createApi({
    reducerPath: "api/auth",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/auth" }),
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
