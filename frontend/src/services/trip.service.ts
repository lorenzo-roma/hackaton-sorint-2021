import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Trip from "../classes/trip.class";
import {BaseQueryResult} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import ConfirmedTrip from "../classes/ConfirmedTrip.class";
import ToBeScheduledTrip, {ToBeScheduledTripApiInterface} from "../classes/ToBeScheduledTrip.class";
import {RootState} from "../stores/store";
import {prepareAuthentication} from "../stores/auth.store";
import Config from "../config";
import {Position} from "../classes/Checkpoint.class";

interface RetrieveDetail {
    id: number;
}

export interface TripResult {
    id: number;
    fromName: string;
    fromPosition: Position;
    toName: string;
    toPosition: Position;
    initialAvailability?: Date;
    endAvailability?: Date;
    confirmedPickup?: Date;
    arrival: Date;
    shiftId?: number;
}

export interface TripListResult {
    toBeScheduledTrips: ToBeScheduledTrip[];
    confirmedTrips: ConfirmedTrip[];
}

type TripCreateRequest = ToBeScheduledTripApiInterface;

export const apiSlice = createApi({
    reducerPath: "api/trip",
    baseQuery: fetchBaseQuery({baseUrl: `${Config.baseUrl}/trip`, prepareHeaders: prepareAuthentication,}),
    endpoints: (builder) => ({
        tripList: builder.mutation<TripListResult, void>({
            query: (request) => ({
                url: "/",
                method: "GET",
            }),
            transformResponse: (response: { data: TripResult[] }) => {
                const trips = response.data;
                return {
                    toBeScheduledTrips: trips.filter(trip => !trip.shiftId) as ToBeScheduledTrip[],
                    confirmedTrips: trips.filter(trip => trip.shiftId) as ConfirmedTrip[],
                }
            }
        }),
        tripDetail: builder.mutation<ConfirmedTrip | ToBeScheduledTrip, RetrieveDetail>({
            query: (request) => ({
                url: `/${request.id}`,
                method: "GET",
            }),
            transformResponse: (response: { data: TripResult }) => {
                return response.data as ConfirmedTrip | ToBeScheduledTrip;
            }
        }),
        createTrip: builder.mutation<ToBeScheduledTrip, TripCreateRequest>({
            query: (request) => ({
                url: '/',
                method: 'POST',
                body: request
            }),
            transformResponse: (response: { data: TripResult }) => {
                return response.data as ToBeScheduledTrip;
            }
        })
    }),
});

export const {useTripListMutation, useTripDetailMutation, useCreateTripMutation} = apiSlice;