import Position from "./position";

export default class Trip implements TripInterface {
    public fromName: string;
    public toName: string;
    public initialAvailability: Date;
    public endAvailability: Date;
    public arrival: Date;
    public userId: string;
    public id: string;
    public shiftId: string;
    public confirmedPickup: Date;
    public fromPosition: Position;
    public toPosition: Position;
}

export interface TripInterface {
    fromName: string;
    toName: string;
    fromPosition: Position;
    toPosition: Position;
    initialAvailability: Date;
    endAvailability: Date;
    arrival: Date;
    userId: string;
    id: string;
    shiftId: string;
    confirmedPickup: Date;
}
