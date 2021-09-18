import AuthServiceInterface from "./auth/auth-service-interface";
import AuthService from "./auth/auth-service";
import RepositoryProvider from "../repository/provider";
import TripServiceInterface from "./trip/trip-service-interface";
import TripService from "./trip/trip-service";
import UserRepository from "../repository/user-repository-interface";
import TripRepository from "../repository/trip-repository-interface";
import CheckpointRepository from "../repository/checkpoint-repository-interface";
import ShiftServiceInterface from "./shift/shift-service-interface";
import ShiftRepository from "../repository/shift-repository-interface";
import ShiftService from "./shift/shift-service";
import PathServiceInterface from "./path/path-service-interface";
import PathService from "./path/path-service";
import PathOptimizerServiceInterface from "./path-optimizer/path-optimizer-interface";
import PathOptimizer from "./path-optimizer/path-optimizer";
export default class ServiceProvider {
    private static authService: AuthServiceInterface;
    private static tripService: TripServiceInterface;
    private static shiftService: ShiftServiceInterface;
    private static pathService: PathServiceInterface;
    private static optimizerService: PathOptimizerServiceInterface;

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

    public static getShiftService(): ShiftServiceInterface {
        if (this.shiftService == null) {
            const shiftRepository: ShiftRepository =
                RepositoryProvider.getRepository();
            const checkpointRepository: CheckpointRepository =
                RepositoryProvider.getRepository();
            const userRepository: UserRepository =
                RepositoryProvider.getRepository();
            this.shiftService = new ShiftService(
                shiftRepository,
                checkpointRepository,
                userRepository
            );
        }
        return this.shiftService;
    }

    public static getOptimizerService(): PathOptimizerServiceInterface {
        if (this.optimizerService == null) {
            this.optimizerService = new PathOptimizer();
        }
        return this.optimizerService;
    }

    public static getPathService(): PathServiceInterface {
        if (this.pathService == null) {
            const shiftRepository: ShiftRepository =
                RepositoryProvider.getRepository();
            const checkpointRepository: CheckpointRepository =
                RepositoryProvider.getRepository();
            const tripService = this.getTripService();
            const optimizerService = this.getOptimizerService();
            this.pathService = new PathService(
                shiftRepository,
                checkpointRepository,
                tripService,
                optimizerService
            );
        }
        return this.pathService;
    }
}
