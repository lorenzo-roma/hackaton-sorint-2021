jest.mock("node-fetch");
import AuthService from "../../services/auth/auth-service";
import AuthServiceInterface from "../../services/auth/auth-service-interface";
import PathOptimizer from "../../services/path-optimizer/path-optimizer";
import PathOptimizerServiceInterface from "../../services/path-optimizer/path-optimizer-interface";
import PathService from "../../services/path/path-service";
import PathServiceInterface from "../../services/path/path-service-interface";
import ServiceProvider from "../../services/provider";
import ShiftService from "../../services/shift/shift-service";
import ShiftServiceInterface from "../../services/shift/shift-service-interface";
import TripService from "../../services/trip/trip-service";
import TripServiceInterface from "../../services/trip/trip-service-interface";

describe("Provide service instances", () => {
    test("Provide valid auth service", () => {
        const authService: AuthServiceInterface =
            ServiceProvider.getAuthService();
        expect(authService).toBeTruthy();
        expect(authService).toBeInstanceOf(AuthService);
    });

    test("Provide always the same instance of auth service", () => {
        const authService: AuthServiceInterface =
            ServiceProvider.getAuthService();
        const secondAuthService: AuthServiceInterface =
            ServiceProvider.getAuthService();
        expect(secondAuthService).toBe(authService);
    });

    test("Provide valid trip service", () => {
        const tripService: TripServiceInterface =
            ServiceProvider.getTripService();
        expect(tripService).toBeTruthy();
        expect(tripService).toBeInstanceOf(TripService);
    });

    test("Provide always the same instance of trip service", () => {
        const tripService: TripServiceInterface =
            ServiceProvider.getTripService();
        const secondTripService: TripServiceInterface =
            ServiceProvider.getTripService();
        expect(secondTripService).toBe(tripService);
    });

    test("Provide valid shift service", () => {
        const shiftService: ShiftServiceInterface =
            ServiceProvider.getShiftService();
        expect(shiftService).toBeTruthy();
        expect(shiftService).toBeInstanceOf(ShiftService);
    });

    test("Provide always the same instance of shift service", () => {
        const shiftService: ShiftServiceInterface =
            ServiceProvider.getShiftService();
        const secondShiftService: ShiftServiceInterface =
            ServiceProvider.getShiftService();
        expect(secondShiftService).toBe(shiftService);
    });

    test("Provide valid path service", () => {
        const pathService: PathServiceInterface =
            ServiceProvider.getPathService();
        expect(pathService).toBeTruthy();
        expect(pathService).toBeInstanceOf(PathService);
    });

    test("Provide always the same instance of path service", () => {
        const pathService: PathServiceInterface =
            ServiceProvider.getPathService();
        const secondPathService: PathServiceInterface =
            ServiceProvider.getPathService();
        expect(pathService).toBe(secondPathService);
    });

    test("Provide valid optimize path service", () => {
        const optimizeService: PathOptimizerServiceInterface =
            ServiceProvider.getOptimizerService();
        expect(optimizeService).toBeTruthy();
        expect(optimizeService).toBeInstanceOf(PathOptimizer);
    });

    test("Provide always the same instance of optimized path service", () => {
        const optimizeService: PathOptimizerServiceInterface =
            ServiceProvider.getOptimizerService();
        const secondOptimizeService: PathOptimizerServiceInterface =
            ServiceProvider.getOptimizerService();
        expect(optimizeService).toBe(secondOptimizeService);
    });
});
