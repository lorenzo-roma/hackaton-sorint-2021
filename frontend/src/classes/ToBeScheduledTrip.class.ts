import Trip from "./trip.class";
import { TripResult } from "../services/trip.service";

export default interface ToBeScheduledTrip extends Trip {
    fromName: string;
    toName: string;
    initialAvailability: Date;
    endAvailability: Date;
}
export interface ToBeScheduledTripApiInterface {
    fromName: string;
    toName: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    arrival: Date;
    initialAvailability: Date;
    endAvailability: Date;
}
