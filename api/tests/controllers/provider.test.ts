import AuthController from "../../controllers/auth-controller";
import ControllerProvider from "../../controllers/provider";

describe("Provide controllers instances", ()=>{

    test("Provide valid auth controller", ()=>{
        const controller: AuthController = ControllerProvider.getAuthController();
        expect(controller).toBeTruthy();
        expect(controller).toBeInstanceOf(AuthController);
    });

    test("Provide always the same instance of auth controller", ()=>{
        const controller : AuthController = ControllerProvider.getAuthController();
        const secondController: AuthController = ControllerProvider.getAuthController();
        expect(controller).toBe(secondController);
    });


})