import OptimizerResult from "../../models/optimizer-result";
import Position from "../../models/position";
import { Tour } from "../../models/tour";
import Trip from "../../models/trip";

export default interface PathOptimizerServiceInterface {
    findNearestTrips(
        position: Position,
        trips: Trip[],
        count: number
    ): Promise<ServiceResponse<OptimizerResult, Trip[]>>;

    getRealisticPath(
        trips: Trip[]
    ): Promise<ServiceResponse<OptimizerResult, Tour>>;
}
