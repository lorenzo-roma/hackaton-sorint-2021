import shift from "../../models/shift";
import Trip from "../../models/trip";
import TripResult from "../../models/trip-result";
import TripRepository from "../../repository/trip-repository-interface";
import TripServiceInterface from "./trip-service-interface";
import { ServiceResponse } from "../../models/service-response";
import checkpoint from "../../models/checkpoint";

export default class TripService implements TripServiceInterface {
    constructor(private repository: TripRepository) {}

    async assignTripToCheckpoint(
        id: string,
        checkpoint: checkpoint
    ): Promise<ServiceResponse<TripResult, Trip>> {
        const trip = await this.repository.findTripById(id);
        if (!trip) return { status: TripResult.TRIP_NOT_FOUND };
        trip.confirmedPickup = checkpoint.time;
        const updated = await this.repository.updateTrip(id, trip);
        if (updated) return { status: TripResult.SUCCESS, data: updated };
        return { status: TripResult.ERROR_DURING_UPDATING_TRIP };
    }

    async assingTripToShift(
        id: string,
        shift: shift
    ): Promise<ServiceResponse<TripResult, Trip>> {
        const trip = await this.repository.findTripById(id);
        if (!trip) return { status: TripResult.TRIP_NOT_FOUND };
        trip.shiftId = shift.id;
        const updated = await this.repository.updateTrip(id, trip);
        if (updated) return { status: TripResult.SUCCESS, data: updated };
        return { status: TripResult.ERROR_DURING_UPDATING_TRIP };
    }

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
        return { status: TripResult.SUCCESS, data: availableTrips };
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
