import AuthServiceInterface from "../services/auth/auth-service-interface";
import ServiceProvider from "../services/provider";
import TripServiceInterface from "../services/trip/trip-service-interface";
import AuthController from "./auth-controller";
import TripController from "./trip-controller";

export default class ControllerProvider {
    private static authController: AuthController;
    private static tripController: TripController;

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
}
