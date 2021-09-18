import AuthServiceInterface from "./auth/auth-service-interface";
import AuthService from "./auth/auth-service";
import RepositoryProvider from "../repository/provider";
import TripServiceInterface from "./trip/trip-service-interface";
import TripService from "./trip/trip-service";
import UserRepository from "../repository/user-repository-interface";
import TripRepository from "../repository/trip-repository-interface";
export default class ServiceProvider {
    private static authService: AuthServiceInterface;
    private static tripService: TripServiceInterface;

    public static getAuthService(): AuthServiceInterface {
        if (this.authService == null) {
            const repository: UserRepository =
                RepositoryProvider.getRepository();
            this.authService = new AuthService(repository);
        }
        return this.authService;
    }

    public static getTripService(): TripServiceInterface {
        if (this.tripService == null) {
            const repository: TripRepository =
                RepositoryProvider.getRepository();

            this.tripService = new TripService(repository);
        }
        return this.tripService;
    }
}
