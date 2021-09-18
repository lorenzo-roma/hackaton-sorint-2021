import { getMockShift } from "../../mocks";
import TripResult from "../../../models/trip-result";
import ShiftRepository from "../../../repository/shift-repository-interface";
import ShiftService from "../../../services/shift/shift-service";
import Shift from "../../../models/shift";
import ShiftResult from "../../../models/shift-result";
import UserRepository from "../../../repository/user-repository-interface";
import CheckpointRepository from "../../../repository/checkpoint-repository-interface";

let serviceTested: ShiftService;
let mockShiftRepository: ShiftRepository;
let mockUserRepository: UserRepository;
let mockCheckpointRepository: CheckpointRepository;

beforeEach(() => {
    mockShiftRepository = {} as ShiftRepository;
    mockUserRepository = {} as UserRepository;
    mockCheckpointRepository = {} as CheckpointRepository;
    serviceTested = new ShiftService(
        mockShiftRepository,
        mockCheckpointRepository,
        mockUserRepository
    );
});

describe("Create tests", () => {
    test("If insert is succefull, it should return success and inserted", async () => {
        const shift: Shift = getMockShift();
        mockShiftRepository.insertShift = jest.fn(async () => {
            return shift;
        });
        const response = await serviceTested.create(shift);
        expect(response.status).toBe(ShiftResult.SUCCESS);
        expect(response.data).toBe(shift);
    });

    test("If insert fails, it should return error response", async () => {
        const shift: Shift = getMockShift();
        mockShiftRepository.insertShift = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.create(shift);
        expect(response.status).toBe(TripResult.ERROR_DURING_CREATION);
    });
});

describe("Find by user id tests", () => {
    test("If query is succefull, it should return success and inserted", async () => {
        const shift: Shift = getMockShift();
        mockShiftRepository.findShiftByUserId = jest.fn(async () => {
            return [shift];
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(ShiftResult.SUCCESS);
        expect(response.data).toStrictEqual([shift]);
    });

    test("If query fails, it should return error response", async () => {
        mockShiftRepository.findShiftByUserId = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(ShiftResult.ERROR_RETRIEVING_SHIFTS);
    });
});
