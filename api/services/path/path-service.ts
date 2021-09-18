import Checkpoint from "../../models/checkpoint";
import PathResult from "../../models/path-result";
import PathServiceInterface from "./path-service-interface";
import ShiftRepositoryInterface from "../../repository/shift-repository-interface";
import TripRepositoryInterface from "../../repository/trip-repository-interface";

import Shift from "../../models/shift";
import Trip from "../../models/trip";
import TripServiceInterface from "../trip/trip-service-interface";
import TripResult from "../../models/trip-result";
import TripRepository from "../../repository/trip-repository-interface";
import TripService from "../trip/trip-service";

export default class PathService implements PathServiceInterface {
    constructor(
        private shiftRepository: ShiftRepositoryInterface,
        private tripService: TripServiceInterface,
        private optimizerService: PathOptimizerServiceInterface
    ) {}

    async calculateForShift(
        id: string
    ): Promise<ServiceResponse<PathResult, Checkpoint[]>> {
        const shift = await this.shiftRepository.findShiftById(id);
        if (!shift) return { status: PathResult.SHIFT_NOT_FOUND };
        const tripResponse = await this.tripService.findTripCompatibleWithShift(
            shift
        );
        if (tripResponse.status != TripResult.SUCCESS)
            return { status: PathResult.ERROR_RETRIEVING_COMPATIBLE_TRIPS };
        const startingTrip = await this.optimizerService.findNearestTrips(
            shift.startingPosition,
            tripResponse.data,
            1
        );

        const finalCheckPoints: Checkpoint[] = [];
        const nearestTrips: Trip[] =
            await this.optimizerService.findNearestTrips(
                startingTrip.startingPosition,
                tripResponse.data,
                shift.capacity - 1
            );
        const tripsToDo: Trip[] = [startingTrip, ...nearestTrips];

        for (let i = 0; i < tripsToDo.length; i++) {
            const possiblePath = await this.optimizerService.getRealistiPath(
                tripsToDo
            );
            if (possiblePath.isFeasable) {
                finalCheckPoints.push(...possiblePath.checkpoints);
                break;
            }
            tripsToDo.pop();
        }
        // loop finche non ci sono più nodi disponibili (o per orario o per numero)
    }
}
