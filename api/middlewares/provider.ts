import AppendUserMiddleware from "./append-user-middleware";
import ServiceProvider from "../services/provider";
import AuthServiceInterface from "../services/auth/auth-service-interface";
import DisableCorsMiddleware from "./disable-cors-middleware";
import ErrorHandlerMiddleware from "./error-handler-middleware";

export default class MiddlewareProvider {
  private static appendUserMiddleware: AppendUserMiddleware;
  private static disableCorsMiddleware: DisableCorsMiddleware;
  private static errorHandlerMiddleware: ErrorHandlerMiddleware;

  public static getAppendUserMiddleware(): AppendUserMiddleware {
    if (this.appendUserMiddleware == null) {
      const authService: AuthServiceInterface =
        ServiceProvider.getAuthService();
      this.appendUserMiddleware = new AppendUserMiddleware(authService);
    }
    return this.appendUserMiddleware;
  }

  public static getDisableCorsMiddleware(): DisableCorsMiddleware {
    if (this.disableCorsMiddleware == null) {
      this.disableCorsMiddleware = new DisableCorsMiddleware();
    }
    return this.disableCorsMiddleware;
  }

  public static getErrorHandlerMiddleware(): ErrorHandlerMiddleware {
    if (this.errorHandlerMiddleware == null) {
      this.errorHandlerMiddleware = new ErrorHandlerMiddleware();
    }
    return this.errorHandlerMiddleware;
  }
}
