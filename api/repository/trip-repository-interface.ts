import Trip from "../models/trip";

export default interface TripRepository {
    findTripByUserId(id: string): Promise<Trip[] | undefined>;
    insertTrip(trip: Trip): Promise<Trip | undefined>;
}
