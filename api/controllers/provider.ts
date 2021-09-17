import AuthServiceInterface from "../services/auth/auth-service-interface";
import ServiceProvider from "../services/provider";
import AuthController from "./auth-controller";

export default class ControllerProvider {
  private static authController: AuthController;

  public static getAuthController(): AuthController {
    if (this.authController == null) {
      const service: AuthServiceInterface = ServiceProvider.getAuthService();
      this.authController = new AuthController(service);
    }
    return this.authController;
  }
}
