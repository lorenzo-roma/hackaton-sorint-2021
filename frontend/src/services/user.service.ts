import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "../config";
import {RootState} from "../stores/store";
import User from "../classes/User.class";
import {prepareAuthentication} from "../stores/auth.store";
import ToBeScheduledTrip from "../classes/ToBeScheduledTrip.class";
import {TripResult} from "./trip.service";

const baseUrl = `${Config.baseUrl}/auth` ;
export const apiSlice = createApi({
    reducerPath: "api/user",
    baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders: prepareAuthentication} ),
    endpoints: (builder) => ({
        retrieveMe: builder.mutation<User, void>({
            query: (credentials) => ({
                url: "/me",
                method: "GET",
            }),
            transformResponse: (response: { data: User }) => {
                return response.data;
            }
        })
    }),
});

export const { useRetrieveMeMutation } = apiSlice;
