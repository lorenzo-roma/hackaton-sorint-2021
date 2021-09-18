import User from "./User.class";

export enum HopType {
    PICKUP,
    DROPOUT
}

export interface Position {
    lng: number;
    lat: number;
}

export default interface Checkpoint {
    id: string;
    shiftId: string;
    position: Position;
    sortIndex: number;
    time: Date;
    tripId: string;
    userId: string;
    hopType: HopType;
    user: User;
}