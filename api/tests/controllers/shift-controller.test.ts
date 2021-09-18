import express from "express";
import ShiftController from "../../controllers/shift-controller";
import TripController from "../../controllers/trip-controller";
import { APIResponseStatus } from "../../models/api-response";
import AuthResult from "../../models/auth-result";
import PathResult from "../../models/path-result";
import shift from "../../models/shift";
import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import User from "../../models/user";
import PathServiceInterface from "../../services/path/path-service-interface";
import ShiftServiceInterface from "../../services/shift/shift-service-interface";
import TripServiceInterface from "../../services/trip/trip-service-interface";
import { getMockShift, getMockCheckpoint } from "../mocks";

let controllerTested: ShiftController;
let mockShiftService: ShiftServiceInterface;
let mockPathService: PathServiceInterface;

beforeEach(() => {
    mockShiftService = {} as ShiftServiceInterface;
    mockPathService = {} as PathServiceInterface;
    controllerTested = new ShiftController(mockShiftService, mockPathService);
});

describe("Perform create shift tests", () => {
    test("If shift is created, return success and shift created", async () => {
        const created: Shift = getMockShift();

        mockShiftService.create = jest.fn(async (): Promise<
            ServiceResponse<ShiftResult, Shift>
        > => {
            return { status: ShiftResult.SUCCESS, data: created };
        });
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                start: created.start,
                end: created.end,
                startingPositionLat: created.startingPosition.lat,
                startingPositionLng: created.startingPosition.lng,
                startingPositionName: created.startingPositionName,
                capacity: created.capacity,
            },
        } as express.Request;
        const response = await controllerTested.createShift(mockReq);
        expect(mockShiftService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual(created);
    });

    test("If shift is not created, return error", async () => {
        const created: Shift = getMockShift();

        mockShiftService.create = jest.fn(async (): Promise<
            ServiceResponse<ShiftResult, Shift>
        > => {
            return { status: ShiftResult.ERROR_DURING_CREATION };
        });
        const mockReq = {
            user: {
                id: "",
            },
            body: {
                start: created.start,
                end: created.end,
                startingPositionLat: created.startingPosition.lat,
                startingPositionLng: created.startingPosition.lng,
                startingPositionName: created.startingPositionName,
                capacity: created.capacity,
            },
        } as express.Request;
        const response = await controllerTested.createShift(mockReq);
        expect(mockShiftService.create).toBeCalledWith(created);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});

describe("Perform retrieve shift tests", () => {
    test("If retrieve is successful, it should return success response", async () => {
        const shifts = [getMockShift()];
        mockShiftService.retrieveByUserId = jest.fn(async (): Promise<
            ServiceResponse<ShiftResult, Shift[]>
        > => {
            return { status: ShiftResult.SUCCESS, data: shifts };
        });
        const mockReq = {
            user: {
                id: "",
            },
        } as express.Request;
        const response = await controllerTested.retrieveShifts(mockReq);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual(shifts);
    });

    test("If retrieve is not successful, it should retrive error response", async () => {
        mockShiftService.retrieveByUserId = jest.fn(async (): Promise<
            ServiceResponse<ShiftResult, Shift[]>
        > => {
            return { status: ShiftResult.ERROR_RETRIEVING_SHIFTS };
        });
        const mockReq = {
            user: {
                id: "",
            },
        } as express.Request;
        const response = await controllerTested.retrieveShifts(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});

describe("Perform calculate path tests", () => {
    test("If path is calculated, return success response", async () => {
        const checkpoints = [getMockCheckpoint()];
        mockPathService.calculateForShift = jest.fn(async () => {
            return { status: PathResult.SUCCESS, data: checkpoints };
        });
        const mockReq = {} as express.Request;
        mockReq.params = { shiftId: "2" };
        const response = await controllerTested.calculatePath(mockReq);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toBe(checkpoints);
    });

    test("If path is not calculated, return success response", async () => {
        mockPathService.calculateForShift = jest.fn(async () => {
            return { status: PathResult.ERROR_CALCULATING_PATH };
        });
        const mockReq = {} as express.Request;
        mockReq.params = { shiftId: "2" };
        const response = await controllerTested.calculatePath(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });
});
