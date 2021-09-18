import Trip from "./trip.class";
import {TripResult} from "../services/trip.service";

export default interface ToBeScheduledTrip extends Trip {

    initialAvailability: Date;
    endAvailability: Date;
}
export interface ToBeScheduledTripApiInterface {
    from: string;
    to: string;
    arrival: Date;
    initialAvailability: Date;
    endAvailability: Date;
}