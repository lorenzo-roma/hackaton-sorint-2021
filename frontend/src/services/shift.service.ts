import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Trip from "../classes/trip.class";
import { BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import ConfirmedTrip from "../classes/ConfirmedTrip.class";
import ToBeScheduledTrip, {
    ToBeScheduledTripApiInterface,
} from "../classes/ToBeScheduledTrip.class";
import { RootState } from "../stores/store";
import { prepareAuthentication } from "../stores/auth.store";
import Config from "../config";
import Checkpoint, {Position} from "../classes/Checkpoint.class";
import AutoCompleteResponse from "../classes/autocomplete-response.class";

interface ShiftListResult {
    id: number;
    start: Date;
    end: Date;
    startingPosition: Position;
    startingPositionName: string;
    capacity: number;
    userId: number;
}
interface ShiftResult {
    id: number;
    start: Date;
    end: Date;
    startingPosition: Position;
    startingPositionName: string;
    capacity: number;
    userId: number;
}
interface ShiftDetailResult {
    id: number;
    start: Date;
    end: Date;
    startingPosition: Position;
    startingPositionName: string;
    capacity: number;
    userId: number;
    checkpoints: Checkpoint[];
}

interface ShiftCreateRequest {
    start: Date;
    end: Date;
    startingPositionLat: number;
    startingPositionLng: number;
    startingPositionName: string;
    capacity: number;
}

export const apiSlice = createApi({
    reducerPath: "api/trip",
    baseQuery: fetchBaseQuery({
        baseUrl: `${Config.baseUrl}/shift`,
        prepareHeaders: prepareAuthentication,
    }),
    endpoints: (builder) => ({
        shiftList: builder.mutation<ShiftListResult[], void>({
            query: (request) => ({
                url: "/",
                method: "GET",
            }),
            transformResponse: (response: { data: ShiftResult[] }) => {
                return response.data;
            },
        }),
        createShift: builder.mutation<ShiftResult, ShiftCreateRequest>({
            query: (request) => ({
                url: "/",
                method: "POST",
                body: request,
            }),
            transformResponse: (response: { data: ShiftResult }) => {
                return response.data;
            },
        }),
        retrieveShift: builder.mutation<ShiftDetailResult, number>({
            query: (request) => ({
                url: `/${request}`,
                method: "GET",
            }),
            transformResponse: (response: { data: ShiftDetailResult }) => {
                return response.data;
            },
        }),
        calculateShift: builder.mutation<void, number>({
            query: (request) => ({
                url: `/path/${request}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useShiftListMutation,
    useCreateShiftMutation,
    useRetrieveShiftMutation,
    useCalculateShiftMutation
} = apiSlice;
