import express from "express";
import ShiftController from "../../controllers/shift-controller";
import TripController from "../../controllers/trip-controller";
import { APIResponseStatus } from "../../models/api-response";
import AuthResult from "../../models/auth-result";
import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import User from "../../models/user";
import ShiftServiceInterface from "../../services/shift/shift-service-interface";
import TripServiceInterface from "../../services/trip/trip-service-interface";
import { getMockShift } from "../mocks";

let controllerTested: ShiftController;
let mockService: ShiftServiceInterface;

beforeEach(() => {
    mockService = {} as ShiftServiceInterface;
    controllerTested = new ShiftController(mockService);
});

describe("Perform create shift tests", () => {
    test("If shift is created, return success and shift created", async () => {
        const created: Shift = getMockShift();

        mockService.create = jest.fn(
            async (): Promise<ServiceResponse<ShiftResult, Shift>> => {
                return { status: ShiftResult.SUCCESS, data: created };
            }
        );
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                start: created.start,
                end: created.end,
                startingPosition: created.startingPosition,
                capacity: created.capacity,
            },
        } as express.Request;
        const response = await controllerTested.createShift(mockReq);
        expect(mockService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual(created);
    });

    test("If shift is not created, return error", async () => {
        const created: Shift = getMockShift();

        mockService.create = jest.fn(
            async (): Promise<ServiceResponse<ShiftResult, Shift>> => {
                return { status: ShiftResult.ERROR_DURING_CREATION };
            }
        );
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                start: created.start,
                end: created.end,
                startingPosition: created.startingPosition,
                capacity: created.capacity,
            },
        } as express.Request;
        const response = await controllerTested.createShift(mockReq);
        expect(mockService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});
