import AuthServiceInterface from "../services/auth/auth-service-interface";
import express from "express";
import AuthResult from "../models/auth-result";
import User from "../models/user";
import { APIResponse } from "../models/api-response";
import TripServiceInterface from "../services/trip/trip-service-interface";
import Trip from "../models/trip";
import TripResult from "../models/trip-result";
import Position from "../models/position";
import {ServiceResponse} from "../models/service-response";

export default class TripController {
    constructor(private tripService: TripServiceInterface) {}

    createTrip = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const tripToCreate: Trip = new Trip();
        tripToCreate.fromName = req.body.fromName;
        tripToCreate.toName = req.body.toName;
        tripToCreate.fromPosition = new Position(
            req.body.fromLat,
            req.body.fromLng
        );
        tripToCreate.toPosition = new Position(req.body.toLat, req.body.toLng);
        tripToCreate.initialAvailability = req.body.initialAvailability;
        tripToCreate.endAvailability = req.body.endAvailability;
        tripToCreate.arrival = req.body.arrival;
        tripToCreate.userId = userId;
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
