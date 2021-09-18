import { HopType } from "./hop-type";
import Position from "./position";
import User from "./user";

export default class Checkpoint {
    public id: string;
    public shiftId: string;
    public position: Position;
    public sortIndex: number;
    public time: Date;
    public tripId: string;
    public userId: string;
    public hopType: HopType;
}

export class CheckpointDetail {
    public id: string;
    public shiftId: string;
    public position: Position;
    public sortIndex: number;
    public time: Date;
    public tripId: string;
    public user: User;
    public hopType: HopType;

    constructor(checkpoint: Checkpoint, user: User) {
        this.id = checkpoint.id;
        this.shiftId = checkpoint.shiftId;
        this.position = checkpoint.position;
        this.sortIndex = checkpoint.sortIndex;
        this.time = checkpoint.time;
        this.tripId = checkpoint.tripId;
        this.user = user;
        this.hopType = checkpoint.hopType;
    }
}
