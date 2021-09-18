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

        mockService.create = jest.fn(
            async (): Promise<ServiceResponse<TripResult, Trip>> => {
                return { status: TripResult.SUCCESS, data: created };
            }
        );
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                from: created.from,
                to: created.to,
                initial_availability: created.initialAvailability,
                end_availability: created.endAvailability,
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

        mockService.create = jest.fn(
            async (): Promise<ServiceResponse<TripResult, Trip>> => {
                return { status: TripResult.ERROR_DURING_CREATION };
            }
        );
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                from: created.from,
                to: created.to,
                initial_availability: created.initialAvailability,
                end_availability: created.endAvailability,
                arrival: created.arrival,
            },
        } as express.Request;
        const response = await controllerTested.createTrip(mockReq);
        expect(mockService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});
