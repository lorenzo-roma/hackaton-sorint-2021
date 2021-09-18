import TripService from "../../../services/trip/trip-service";
import TripRepository from "../../../repository/trip-repository-interface";
import { getMockCheckpoint, getMockShift, getMockTrip } from "../../mocks";
import Trip from "../../../models/trip";
import TripResult from "../../../models/trip-result";
import Shift from "../../../models/shift";

let serviceTested: TripService;
let mockRepository: TripRepository;

beforeEach(() => {
    mockRepository = {} as TripRepository;
    serviceTested = new TripService(mockRepository);
});

describe("Create tests", () => {
    test("If insert is succefull, it should return success and inserted", async () => {
        const trip: Trip = getMockTrip();
        mockRepository.insertTrip = jest.fn(async () => {
            return trip;
        });
        const response = await serviceTested.create(trip);
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toBe(trip);
    });

    test("If insert fails, it should return error response", async () => {
        const trip: Trip = getMockTrip();
        mockRepository.insertTrip = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.create(trip);
        expect(response.status).toBe(TripResult.ERROR_DURING_CREATION);
    });
});

describe("Find by user id tests", () => {
    test("If query is succefull, it should return success and inserted", async () => {
        const trip: Trip = getMockTrip();
        mockRepository.findTripsByUserId = jest.fn(async () => [trip]);
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toStrictEqual([trip]);
    });

    test("If query fails, it should return error response", async () => {
        mockRepository.findTripsByUserId = jest.fn(async () => undefined);
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(TripResult.ERROR_RETRIEVING_TRIPS);
    });
});

describe("Find trips compatible with shift tests", () => {
    test("If trips cannot be retrieved, it should return error", async () => {
        const shift: Shift = getMockShift();
        mockRepository.findTripsBetween = jest.fn(async () => undefined);
        const response = await serviceTested.findTripCompatibleWithShift(shift);
        expect(response.status).toBe(TripResult.ERROR_RETRIEVING_TRIPS);
    });

    test("If trips are available, it should return them and success response", async () => {
        const shift: Shift = getMockShift();
        const trips = [getMockTrip()];
        mockRepository.findTripsBetween = jest.fn(async () => trips);
        const response = await serviceTested.findTripCompatibleWithShift(shift);
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toStrictEqual(trips);
    });

    test("If trips are available, but are already taken by other shifts, it should not return them and success response", async () => {
        const shift: Shift = getMockShift();
        const trips = [getMockTrip(), getMockTrip()];
        trips[0].shiftId = "22";
        trips[1].shiftId = "2";
        mockRepository.findTripsBetween = jest.fn(async () => trips);
        const response = await serviceTested.findTripCompatibleWithShift(shift);
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toStrictEqual([]);
    });

    test("If trips are available, but some already taken by other shifts, it should return those not taken and success response", async () => {
        const shift: Shift = getMockShift();
        const trips = [getMockTrip(), getMockTrip()];
        trips[0].shiftId = "22";
        mockRepository.findTripsBetween = jest.fn(async () => trips);
        const response = await serviceTested.findTripCompatibleWithShift(shift);
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toStrictEqual([trips[1]]);
    });
});

describe("Assign trip to shift tests", () => {
    test("If trip is not found, return not found status", async () => {
        const tripId = "0";
        const shift = getMockShift();
        mockRepository.findTripById = jest.fn(async () => undefined);
        const result = await serviceTested.assingTripToShift(tripId, shift);
        expect(result.status).toBe(TripResult.TRIP_NOT_FOUND);
    });

    test("If trip is found, return updated trip", async () => {
        const tripId = "0";
        const shift = getMockShift();
        const trip = getMockTrip();
        mockRepository.findTripById = jest.fn(async () => trip);
        const mockFn = jest.fn(async (id: string, t: Trip) => trip);
        mockRepository.updateTrip = mockFn;
        const result = await serviceTested.assingTripToShift(tripId, shift);
        const toUpdate = mockFn.mock.calls[0][1];
        expect(toUpdate.shiftId).toBe(shift.id);
        expect(result.status).toBe(TripResult.SUCCESS);
        expect(result.data).toBe(trip);
    });

    test("If trip is found, but update does not succeds, return error result", async () => {
        const tripId = "0";
        const shift = getMockShift();
        const trip = getMockTrip();
        mockRepository.findTripById = jest.fn(async () => trip);
        mockRepository.updateTrip = jest.fn(async () => undefined);
        const result = await serviceTested.assingTripToShift(tripId, shift);
        expect(result.status).toBe(TripResult.ERROR_DURING_UPDATING_TRIP);
    });
});

describe("Assign trip to checkpoint tests", () => {
    test("If trip is not found, return not found status", async () => {
        const tripId = "0";
        const checkpoint = getMockCheckpoint();
        mockRepository.findTripById = jest.fn(async () => undefined);
        const result = await serviceTested.assignTripToCheckpoint(
            tripId,
            checkpoint
        );
        expect(result.status).toBe(TripResult.TRIP_NOT_FOUND);
    });

    test("If trip is found, return updated trip", async () => {
        const tripId = "0";
        const checkpoint = getMockCheckpoint();
        const trip = getMockTrip();
        mockRepository.findTripById = jest.fn(async () => trip);
        const mockFn = jest.fn(async (id: string, t: Trip) => trip);
        mockRepository.updateTrip = mockFn;
        const result = await serviceTested.assignTripToCheckpoint(
            tripId,
            checkpoint
        );
        const toUpdate = mockFn.mock.calls[0][1];
        expect(toUpdate.confirmedPickup).toBe(checkpoint.time);
        expect(result.status).toBe(TripResult.SUCCESS);
        expect(result.data).toBe(trip);
    });

    test("If trip is found, but update does not succeds, return error result", async () => {
        const tripId = "0";
        const checkpoint = getMockCheckpoint();
        const trip = getMockTrip();
        mockRepository.findTripById = jest.fn(async () => trip);
        const mockFn = jest.fn(async () => undefined);
        mockRepository.updateTrip = mockFn;
        const result = await serviceTested.assignTripToCheckpoint(
            tripId,
            checkpoint
        );
        expect(result.status).toBe(TripResult.ERROR_DURING_UPDATING_TRIP);
    });
});
