import Trip from "./trip.class";
import {TripResult} from "../services/trip.service";

export default class ToBeScheduledTrip extends  Trip  {
    constructor(id:number, from: string, to:string, arrival: Date, public initialAvailability: Date, public endAvailability: Date) {
        super(id, from, to, arrival);
    }

    static fromTripResult(tripResult: TripResult) {
        return new ToBeScheduledTrip(tripResult.id, tripResult.from, tripResult.to, tripResult.arrival, tripResult.initialAvailability!, tripResult.endAvailability!)
    }
}

export interface ToBeScheduledTripApiInterface {
    from: string;
    to: string;
    arrival: Date;
    initialAvailability: Date;
    endAvailability: Date;
}