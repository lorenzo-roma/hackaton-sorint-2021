import AuthController from "../../controllers/auth-controller";
import ControllerProvider from "../../controllers/provider";
import TripController from "../../controllers/trip-controller";

describe("Provide controllers instances", () => {
    test("Provide valid auth controller", () => {
        const controller: AuthController =
            ControllerProvider.getAuthController();
        expect(controller).toBeTruthy();
        expect(controller).toBeInstanceOf(AuthController);
    });

    test("Provide always the same instance of auth controller", () => {
        const controller: AuthController =
            ControllerProvider.getAuthController();
        const secondController: AuthController =
            ControllerProvider.getAuthController();
        expect(controller).toBe(secondController);
    });

    test("Provide valid trip controller", () => {
        const controller: TripController =
            ControllerProvider.getTripController();
        expect(controller).toBeTruthy();
        expect(controller).toBeInstanceOf(TripController);
    });

    test("Provide always the same instance of trip controller", () => {
        const controller: TripController =
            ControllerProvider.getTripController();
        const secondController: TripController =
            ControllerProvider.getTripController();
        expect(controller).toBe(secondController);
    });
});
