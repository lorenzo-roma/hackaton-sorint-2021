import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";

export default interface TripServiceInterface {
    create(trip: Trip): Promise<ServiceResponse<TripResult, Trip>>;
    retrieveByUserId(id: string): Promise<ServiceResponse<TripResult, Trip[]>>;
}
