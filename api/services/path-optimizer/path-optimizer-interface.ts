import OptimizerResult from "../../models/optimizer-result";
import Position from "../../models/position";
import { Tour } from "../../models/tour";
import Trip from "../../models/trip";
import {ServiceResponse} from "../../models/service-response";

export default interface PathOptimizerServiceInterface {
    findNearestTrips(
        position: Position,
        trips: Trip[],
        count: number
    ): Promise<ServiceResponse<OptimizerResult, Trip[]>>;

    getRealisticPath(
        trips: Trip[],
        startingPosition: Position,
        startDate: Date
    ): Promise<ServiceResponse<OptimizerResult, Tour>>;
}
