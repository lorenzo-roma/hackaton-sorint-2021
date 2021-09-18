import config from "../../config";
import moment from "moment";
import Checkpoint from "../../models/checkpoint";
import trip, { TripInterface } from "../../models/trip";
import Position from "../../models/position";
import { HopType } from "../../models/hop-type";
import { Tour } from "../../models/tour";
import PathOptimizerServiceInterface from "./path-optimizer-interface";
import OptimizerResult from "../../models/optimizer-result";
import { ServiceResponse } from "../../models/service-response";
import axios from "axios";

export default class PathOptimizer implements PathOptimizerServiceInterface {
    async findNearestTrips(
        position: Position,
        trips: trip[],
        count: number
    ): Promise<ServiceResponse<OptimizerResult, trip[]>> {
        const distances = await this.getDistancesToLocations(
            { ...position, name: "Start" },
            trips.map((trip) => {
                return {
                    lat: trip.fromPosition.lat,
                    lng: trip.fromPosition.lng,
                    name: `${trip.id}`,
                };
            })
        );
        const sortedDistances = distances.sort(
            (a, b) => a.duration - b.duration
        );
        return {
            status: OptimizerResult.SUCCESS,
            data: sortedDistances
                .map((distance) => trips[Number(distance.to) - 1])
                .slice(0, count - 1),
        };
    }

    async getRealisticPath(
        trips: trip[],
        startingPosition: Position,
        startDate: Date
    ): Promise<ServiceResponse<OptimizerResult, Tour>> {
        return {
            status: OptimizerResult.SUCCESS,
            data: await this.callTour(trips, startDate, startingPosition),
        };
    }

    basePath = "https://api.routexl.com";

    async callDistanceMatrix(locations: Location[]) {
        const params = new URLSearchParams();
        params.set("locations", JSON.stringify(locations));
        const result = await axios(`${this.basePath}/distances`, {
            headers: {
                Authorization: `Basic ${new Buffer(
                    `${config.routeXL.username}:${config.routeXL.password}`
                ).toString("base64")}`,
            },
            method: "POST",
            data: params,
        });
        const r = result.data as DistanceMatrixResponse;
        return {
            count: r.count,
            distances: Object.values(r.distances),
        } as DistanceMatrix;
    }

    diffToMin(from: Date, to: Date) {
        return moment(to).diff(moment(from), "s");
    }

    async callTour(
        trips: LocationTour[],
        startShift: Date,
        startLocation: Position
    ): Promise<Tour> {
        const params = new URLSearchParams();
        const diffFromStartShift = (to: Date) => this.diffToMin(to, startShift);
        const startEndLocation: LocationTourRequest = {
            name: "start",
            lat: startLocation.lat,
            lng: startLocation.lng,
            restrictions: [],
        };
        const locations: LocationTourRequest[] = [startEndLocation];
        let index = 0;
        for (const trip of trips) {
            locations.push({
                lat: trip.fromPosition.lat,
                lng: trip.fromPosition.lng,
                name: "s_" + trip.id,
                restrictions: [
                    diffFromStartShift(trip.initialAvailability), // ready
                    diffFromStartShift(trip.endAvailability), // due
                    index + 2, // Before starting
                    0, // after
                ],
            });
            locations.push({
                lat: trip.toPosition.lat,
                lng: trip.toPosition.lng,
                name: "e_" + trip.id,
                restrictions: [
                    1, // ready
                    diffFromStartShift(trip.arrival), // due
                    index + 1,
                ],
            });
            index += 2;
        }
        locations.push(startEndLocation);
        params.set(
            "locations",
            JSON.stringify(locations as LocationTourRequest[])
        );
        const result = await axios(`${this.basePath}/tour`, {
            headers: {
                Authorization: `Basic ${new Buffer(
                    `${config.routeXL.username}:${config.routeXL.password}`
                ).toString("base64")}`,
            },
            method: "POST",
            data: params,
        });
        const r = result.data as TourResponse;
        const points = Object.values(r.route);
        const checkpoints = points.map((point, index) => {
            const toReturn = new Checkpoint();
            if (point.name === "start") {
                return null;
            }
            const trip = trips.find(
                (t) => point.name === `e_${t.id}` || point.name === `s_${t.id}`
            )!;
            const isPickup = point.name === `s_${trip.id}`;
            toReturn.position = {
                lat: isPickup ? trip.fromPosition.lat : trip.toPosition.lat,
                lng: isPickup ? trip.fromPosition.lat : trip.toPosition.lat,
            };
            toReturn.hopType = isPickup ? HopType.PICKUP : HopType.DROPOUT;
            toReturn.userId = trip.userId;
            toReturn.tripId = trip.id;
            toReturn.sortIndex = index;
            toReturn.time = moment(startShift)
                .add(point.arrival, "second")
                .toDate();
            return toReturn;
        });
        return {
            count: r.count,
            feasible: r.feasible,
            checkpoints: checkpoints.filter(
                (checkpoint) => checkpoint !== null
            ) as Checkpoint[],
        };
    }

    async getDistancesToLocations(
        startingLocation: Location,
        endingLocations: Location[]
    ) {
        const result = await this.callDistanceMatrix([
            startingLocation,
            ...endingLocations,
        ]);
        return result.distances.filter((distance) => distance.from === 0);
    }
}

export interface DistanceMatrixResponse {
    count: number;
    distances: {
        [index: string]: {
            from: number;
            to: number;
            distance: number;
            duration: number;
            router: boolean;
        };
    };
}

export interface TourResponse {
    count: number;
    feasible: boolean;
    route: {
        [index: string]: {
            name: string;
            arrival: number;
            distance: number;
        };
    };
}

export interface DistanceMatrix {
    count: number;
    distances: {
        from: number;
        to: number;
        distance: number;
        duration: number;
        router: boolean;
    }[];
}

export interface Location {
    lng: number;
    lat: number;
    name?: string;
}

export interface LocationTour extends TripInterface {}

interface LocationTourRequest {
    lng: number;
    lat: number;
    name: string;
    restrictions: number[];
}
