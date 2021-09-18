import Shift from "../../models/shift";
import AuthService from "../../services/auth/auth-service";
import AuthServiceInterface from "../../services/auth/auth-service-interface";
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
});
