import { getMockShift } from "../../mocks";
import TripResult from "../../../models/trip-result";
import ShiftRepository from "../../../repository/shift-repository-interface";
import ShiftService from "../../../services/shift/shift-service";
import Shift from "../../../models/shift";
import ShiftResult from "../../../models/shift-result";

let serviceTested: ShiftService;
let mockRepository: ShiftRepository;

beforeEach(() => {
    mockRepository = {} as ShiftRepository;
    serviceTested = new ShiftService(mockRepository);
});

describe("Create tests", () => {
    test("If insert is succefull, it should return success and inserted", async () => {
        const shift: Shift = getMockShift();
        mockRepository.insertShift = jest.fn(async () => {
            return shift;
        });
        const response = await serviceTested.create(shift);
        expect(response.status).toBe(ShiftResult.SUCCESS);
        expect(response.data).toBe(shift);
    });

    test("If insert fails, it should return error response", async () => {
        const shift: Shift = getMockShift();
        mockRepository.insertShift = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.create(shift);
        expect(response.status).toBe(TripResult.ERROR_DURING_CREATION);
    });
});

describe("Find by user id tests", () => {
    test("If query is succefull, it should return success and inserted", async () => {
        const shift: Shift = getMockShift();
        mockRepository.findShiftByUserId = jest.fn(async () => {
            return [shift];
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(ShiftResult.SUCCESS);
        expect(response.data).toStrictEqual([shift]);
    });

    test("If query fails, it should return error response", async () => {
        mockRepository.findShiftByUserId = jest.fn(async () => {
            return undefined;
        });
        const response = await serviceTested.retrieveByUserId("0");
        expect(response.status).toBe(ShiftResult.ERROR_RETRIEVING_SHIFTS);
    });
});
