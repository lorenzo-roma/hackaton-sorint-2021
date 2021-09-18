import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../config";
import {RootState} from "../stores/store";

interface Credentials {
    username: string;
    password: string;
}
interface SignupRequest {
    username: string;
    name: string;
    surname: string;
    phoneNumber: string;
    password: string;
    driver: boolean;
}

interface AuthResult {
    status: string;
    data: {
        token: string;
    };
}
const baseUrl = `${Config.baseUrl}/auth` ;
export const apiSlice = createApi({
    reducerPath: "api/auth",
    baseQuery: fetchBaseQuery({ baseUrl} ),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResult, SignupRequest>({
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
        })
    }),
});

export const { useSignupMutation, useLoginMutation } = apiSlice;
