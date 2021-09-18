import AuthServiceInterface from "../services/auth/auth-service-interface";
import express from "express";
import AuthResult from "../models/auth-result";
import User from "../models/user";
import { APIResponse } from "../models/api-response";
import TripServiceInterface from "../services/trip/trip-service-interface";
import Trip from "../models/trip";
import TripResult from "../models/trip-result";

export default class TripController {
    constructor(private tripService: TripServiceInterface) {}

    createTrip = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const tripToCreate: Trip = new Trip();
        tripToCreate.setFrom(req.body.from);
        tripToCreate.setTo(req.body.to);
        tripToCreate.setInitialAvailability(req.body.initial_availability);
        tripToCreate.setEndAvailability(req.body.end_availability);
        tripToCreate.setArrival(req.body.arrival);
        tripToCreate.setUserId(userId);
        const response: ServiceResponse<TripResult, Trip> =
            await this.tripService.create(tripToCreate);
        if (response.status != TripResult.SUCCESS) return APIResponse.Error();
        return APIResponse.Success(response.data);
    };

    retrieveTrips = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const response: ServiceResponse<TripResult, Trip[]> =
            await this.tripService.retrieveByUserId(userId);
        if (response.status != TripResult.SUCCESS) return APIResponse.Error();
        return APIResponse.Success(response.data);
    };
}
