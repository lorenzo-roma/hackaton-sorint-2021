import AuthServiceInterface from "./auth/auth-service-interface";
import AuthService from "./auth/auth-service";
import RepositoryProvider from "../repository/provider";
import Repository from "../repository/repository-interface";

export default class ServiceProvider {
  private static authService: AuthServiceInterface;

  public static getAuthService(): AuthServiceInterface {
    if (this.authService == null) {
      const repository: Repository = RepositoryProvider.getRepository();
      this.authService = new AuthService(repository);
    }
    return this.authService;
  }
}
