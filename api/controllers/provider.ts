import AuthServiceInterface from "../services/auth/auth-service-interface";
import ServiceProvider from "../services/provider";
import ShiftServiceInterface from "../services/shift/shift-service-interface";
import TripServiceInterface from "../services/trip/trip-service-interface";
import AuthController from "./auth-controller";
import ShiftController from "./shift-controller";
import TripController from "./trip-controller";

export default class ControllerProvider {
    private static authController: AuthController;
    private static tripController: TripController;
    private static shiftController: ShiftController;

    public static getAuthController(): AuthController {
        if (this.authController == null) {
            const service: AuthServiceInterface =
                ServiceProvider.getAuthService();
            this.authController = new AuthController(service);
        }
        return this.authController;
    }

    public static getTripController(): TripController {
        if (this.tripController == null) {
            const service: TripServiceInterface =
                ServiceProvider.getTripService();
            this.tripController = new TripController(service);
        }
        return this.tripController;
    }

    public static getShiftController(): ShiftController {
        if (this.shiftController == null) {
            const service: ShiftServiceInterface =
                ServiceProvider.getShiftService();
            this.shiftController = new ShiftController(service);
        }
        return this.shiftController;
    }
}
