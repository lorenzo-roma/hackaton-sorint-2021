import fetch, {Headers} from 'node-fetch';
import config from "../../config";


export default class PathOptimizer {
    static basePath = "https://api.routexl.com";

    static async callDistanceMatrix(locations: Location[]) {
        const params = new URLSearchParams();
        params.set('locations', JSON.stringify(locations));
        const result = await fetch(`${this.basePath}/distance`, {
            headers: new Headers({
                "Authentication": `Basic ${new Buffer(`${config.routeXL.username}:${config.routeXL.password}`).toString('base64')}`
            }),
            method: 'POST',
            body: params
        });
        const r = (await result.json()) as DistanceMatrixResponse;
        return {
            count: r.count,
            distances: Object.values(r.distances)
        } as DistanceMatrix
    }

    static async getDistancesToLocations(startingLocation: Location, endingLocations: Location[]) {
        const result = await this.callDistanceMatrix([startingLocation, ...endingLocations]);
        return result.distances.filter(distance => distance.from === "1");
    }
}

export interface DistanceMatrixResponse {
    count: number;
    distances:
        {
            [index: string]:
                {
                    from: string;
                    to: string;
                    distance: number;
                    duration: number;
                    router: boolean;
                }
        }
}

export interface DistanceMatrix {
    count: number;
    distances:
        {
            from: string;
            to: string;
            distance: number;
            duration: number;
            router: boolean;
        }[]
}

export interface Location {
    longitude: number;
    latitude: number;
    id: number;
}