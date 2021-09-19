import Checkpoint from "../../models/checkpoint";
import PathResult from "../../models/path-result";
import PathServiceInterface from "./path-service-interface";
import ShiftRepositoryInterface from "../../repository/shift-repository-interface";
import Trip from "../../models/trip";
import TripServiceInterface from "../trip/trip-service-interface";
import TripResult from "../../models/trip-result";
import PathOptimizerServiceInterface from "../path-optimizer/path-optimizer-interface";
import Position from "../../models/position";
import { ServiceResponse } from "../../models/service-response";
import CheckPointRepositoryInterface from "../../repository/checkpoint-repository-interface";
import { HopType } from "../../models/hop-type";

export default class PathService implements PathServiceInterface {
    constructor(
        private shiftRepository: ShiftRepositoryInterface,
        private checkpointRepository: CheckPointRepositoryInterface,
        private tripService: TripServiceInterface,
        private optimizerService: PathOptimizerServiceInterface
    ) {}

    async calculateForShift(
        id: string
    ): Promise<ServiceResponse<PathResult, Checkpoint[]>> {
        const shift = await this.shiftRepository.findShiftById(id);
        if (!shift) return { status: PathResult.SHIFT_NOT_FOUND };
        let tripResponse = await this.tripService.findTripCompatibleWithShift(
            shift
        );
        if (tripResponse.status != TripResult.SUCCESS)
            return { status: PathResult.ERROR_RETRIEVING_COMPATIBLE_TRIPS };

        let possibleTrips = [...tripResponse.data!];

        const finalCheckPoints: Checkpoint[] = [];
        let currentPosition: Position = shift.startingPosition;
        let currentTime: Date = shift.start;

        while (possibleTrips.length > 0 && currentTime < shift.end) {
            let nearestTrips = await this.optimizerService.findNearestTrips(
                currentPosition,
                possibleTrips,
                shift.capacity
            );
            let tripsToTry: Trip[] = [...nearestTrips.data!];
            while (tripsToTry.length > 0) {
                const possiblePath =
                    await this.optimizerService.getRealisticPath(
                        tripsToTry,
                        currentPosition,
                        currentTime
                    );
                if (possiblePath.data!.feasible) {
                    finalCheckPoints.push(...possiblePath.data!.checkpoints);
                    possibleTrips = possibleTrips.filter(
                        (t) => !tripsToTry.includes(t)
                    );
                    tripsToTry = [];
                    break;
                }
                if (tripsToTry.length == 1) {
                    possibleTrips = possibleTrips.filter(
                        (t) => t != tripsToTry[0]
                    );
                }
                tripsToTry.pop();
            }
            if (finalCheckPoints.length == 0) continue;
            currentTime = finalCheckPoints[finalCheckPoints.length - 1].time;
            currentPosition =
                finalCheckPoints[finalCheckPoints.length - 1].position;

            possibleTrips = possibleTrips.filter(
                (t) => t.endAvailability < currentTime
            );
        }

        for (const checkpoint of finalCheckPoints) {
            checkpoint.shiftId = id;
            const trip = tripResponse.data!.find(
                (t: Trip) => t.id == checkpoint.tripId
            );
            checkpoint.positionName =
                checkpoint.hopType == HopType.PICKUP
                    ? trip!.fromName
                    : trip!.toName;
            await this.tripService.assingTripToShift(trip!.id, shift);
            await this.tripService.assignTripToCheckpoint(trip!.id, checkpoint);
            await this.checkpointRepository.insertCheckpoint(checkpoint);
        }
        return { status: PathResult.SUCCESS, data: finalCheckPoints };
    }
}
