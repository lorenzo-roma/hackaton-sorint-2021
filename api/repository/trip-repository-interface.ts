import Trip from "../models/trip";

export default interface TripRepository {
    findTripsByUserId(id: string): Promise<Trip[] | undefined>;
    insertTrip(trip: Trip): Promise<Trip | undefined>;
    findTripsBetween(start: Date, end: Date): Promise<Trip[] | undefined>;
}
