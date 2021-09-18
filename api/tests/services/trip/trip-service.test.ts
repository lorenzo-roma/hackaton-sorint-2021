import TripService from "../../../services/trip/trip-service";
import TripRepository from "../../../repository/trip-repository-interface";
import { getMockTrip } from "../../mocks";
import Trip from "../../../models/trip";
import TripResult from "../../../models/trip-result";

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
        mockRepository.findTripByUserId = jest.fn(async () => {
            return [trip];
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(TripResult.SUCCESS);
        expect(response.data).toStrictEqual([trip]);
    });

    test("If query fails, it should return error response", async () => {
        mockRepository.findTripByUserId = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(TripResult.ERROR_RETRIEVING_TRIPS);
    });
});
