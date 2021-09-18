import Shift from "../../models/shift";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import { ServiceResponse } from "../../models/service-response";
import Checkpoint from "../../models/checkpoint";

export default interface TripServiceInterface {
    create(trip: Trip): Promise<ServiceResponse<TripResult, Trip>>;
    retrieveByUserId(id: string): Promise<ServiceResponse<TripResult, Trip[]>>;
    findTripCompatibleWithShift(
        shift: Shift
    ): Promise<ServiceResponse<TripResult, Trip[]>>;
    assingTripToShift(
        id: string,
        shift: Shift
    ): Promise<ServiceResponse<TripResult, Trip>>;
    assignTripToCheckpoint(
        id: string,
        checkpoint: Checkpoint
    ): Promise<ServiceResponse<TripResult, Trip>>;
}
