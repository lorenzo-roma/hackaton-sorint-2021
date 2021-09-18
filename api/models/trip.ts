import Position from "./position";

export default class Trip implements TripInterface {
    public fromName: string;
    public toName: string;
    public fromLat: number;
    public fromLng: number;
    public toLat: number;
    public toLng: number;
    public initialAvailability: Date;
    public endAvailability: Date;
    public arrival: Date;
    public userId: string;
    public id: string;
    public shiftId: string;
    public confirmedPickup: Date;
    public fromPosition: Position;
    public toPosition: Position;

    setFromName(value: string) {
        this.fromName = value;
    }

    setToName(value: string) {
        this.toName = value;
    }

    setFromLat(value: number) {
        this.fromLat = value;
    }

    setToLat(value: number) {
        this.toLat = value;
    }

    setFromLng(value: number) {
        this.fromLng = value;
    }

    setToLng(value: number) {
        this.toLng = value;
    }

    setInitialAvailability(value: Date) {
        this.initialAvailability = value;
    }

    setEndAvailability(value: Date) {
        this.endAvailability = value;
    }

    setArrival(value: Date) {
        this.arrival = value;
    }

    setUserId(value: string) {
        this.userId = value;
    }

    setId(value: string) {
        this.id = value;
    }
}

export interface TripInterface {
    fromName: string;
    toName: string;
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
    initialAvailability: Date;
    endAvailability: Date;
    arrival: Date;
    userId: string;
    id: string;
    shiftId: string;
    confirmedPickup: Date;
}
