import Trip from "./trip.class";
import {TripResult} from "../services/trip.service";

export default class ConfirmedTrip extends Trip {
    constructor(id: number, from: string, to: string,
                arrival: Date,
                public confirmedPickedUp: Date,) {
        super(id, from, to, arrival);
    }


    static fromTripResult(tripResult: TripResult) {
        return new ConfirmedTrip(tripResult.id, tripResult.from, tripResult.to, tripResult.arrival!, tripResult.confirmed_pickup!)
    }
}