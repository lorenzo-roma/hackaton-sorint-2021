import express from "express";
import TripController from "../../controllers/trip-controller";
import { APIResponseStatus } from "../../models/api-response";
import AuthResult from "../../models/auth-result";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import User from "../../models/user";
import TripServiceInterface from "../../services/trip/trip-service-interface";
import { getMockTrip } from "../mocks";

let controllerTested: TripController;
let mockService: TripServiceInterface;

beforeEach(() => {
    mockService = {} as TripServiceInterface;
    controllerTested = new TripController(mockService);
});

describe("Perform create trip tests", () => {
    test("If trip is created, return success and trip created", async () => {
        const created: Trip = getMockTrip();

        mockService.create = jest.fn(async (): Promise<
            ServiceResponse<TripResult, Trip>
        > => {
            return { status: TripResult.SUCCESS, data: created };
        });
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                fromName: created.fromName,
                toName: created.toName,
                fromLat: created.fromLat,
                fromLng: created.fromLng,
                toLat: created.toLat,
                toLng: created.toLng,
                initialAvailability: created.initialAvailability,
                endAvailability: created.endAvailability,
                arrival: created.arrival,
            },
        } as express.Request;
        const response = await controllerTested.createTrip(mockReq);
        expect(mockService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual(created);
    });

    test("If trip is not created, return error", async () => {
        const created: Trip = getMockTrip();

        mockService.create = jest.fn(async (): Promise<
            ServiceResponse<TripResult, Trip>
        > => {
            return { status: TripResult.ERROR_DURING_CREATION };
        });
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                fromName: created.fromName,
                toName: created.toName,
                fromLat: created.fromLat,
                fromLng: created.fromLng,
                toLat: created.toLat,
                toLng: created.toLng,
                initialAvailability: created.initialAvailability,
                endAvailability: created.endAvailability,
                arrival: created.arrival,
            },
        } as express.Request;
        const response = await controllerTested.createTrip(mockReq);
        expect(mockService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});

describe("Perform retrieve trips tests", () => {
    test("If retrieve is successful, it should return success response", async () => {
        const trips = [getMockTrip()];
        mockService.retrieveByUserId = jest.fn(async (): Promise<
            ServiceResponse<TripResult, Trip[]>
        > => {
            return { status: TripResult.SUCCESS, data: trips };
        });
        const mockReq = {
            user: {
                id: "",
            },
        } as express.Request;
        const response = await controllerTested.retrieveTrips(mockReq);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual(trips);
    });

    test("If retrieve is not successful, it should retrive error response", async () => {
        mockService.retrieveByUserId = jest.fn(async (): Promise<
            ServiceResponse<TripResult, Trip[]>
        > => {
            return { status: TripResult.ERROR_RETRIEVING_TRIPS };
        });
        const mockReq = {
            user: {
                id: "",
            },
        } as express.Request;
        const response = await controllerTested.retrieveTrips(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});
