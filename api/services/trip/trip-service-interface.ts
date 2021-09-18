import Shift from "../../models/shift";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import {ServiceResponse} from "../../models/service-response";

export default interface TripServiceInterface {
    create(trip: Trip): Promise<ServiceResponse<TripResult, Trip>>;
    retrieveByUserId(id: string): Promise<ServiceResponse<TripResult, Trip[]>>;
    findTripCompatibleWithShift(
        shift: Shift
    ): Promise<ServiceResponse<TripResult, Trip[]>>;
}
