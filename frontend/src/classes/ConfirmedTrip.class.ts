import Trip from "./trip.class";
import {TripResult} from "../services/trip.service";

export default interface ConfirmedTrip extends Trip {
    confirmedPickup:Date;

}