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
        tripToCreate.setFromName(req.body.fromName);
        tripToCreate.setToName(req.body.toName);
        tripToCreate.setFromLat(req.body.fromLat);
        tripToCreate.setToLat(req.body.toLat);
        tripToCreate.setFromLng(req.body.fromLng);
        tripToCreate.setToLng(req.body.toLng);
        tripToCreate.setInitialAvailability(req.body.initialAvailability);
        tripToCreate.setEndAvailability(req.body.endAvailability);
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
