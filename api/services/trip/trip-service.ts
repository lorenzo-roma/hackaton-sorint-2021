import shift from "../../models/shift";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import TripRepository from "../../repository/trip-repository-interface";
import TripServiceInterface from "./trip-service-interface";

export default class TripService implements TripServiceInterface {
    constructor(private repository: TripRepository) {}

    async findTripCompatibleWithShift(
        shift: shift
    ): Promise<ServiceResponse<TripResult, Trip[]>> {
        const startDate: Date = shift.start;
        const endDate: Date = shift.end;
        const trips = await this.repository.findTripsBetween(
            startDate,
            endDate
        );
        if (!trips) return { status: TripResult.ERROR_RETRIEVING_TRIPS };
        const availableTrips: Trip[] = trips.filter((t) => t.shiftId == null);
        //TODO remove unreachable trips
        return { status: TripResult.SUCCESS, data: trips };
    }

    async create(trip: Trip): Promise<ServiceResponse<TripResult, Trip>> {
        const inserted = await this.repository.insertTrip(trip);
        if (inserted) return { status: TripResult.SUCCESS, data: inserted };
        return { status: TripResult.ERROR_DURING_CREATION };
    }
    async retrieveByUserId(
        id: string
    ): Promise<ServiceResponse<TripResult, Trip[]>> {
        const trips = await this.repository.findTripsByUserId(id);
        if (trips) return { status: TripResult.SUCCESS, data: trips };
        return { status: TripResult.ERROR_RETRIEVING_TRIPS };
    }
}
