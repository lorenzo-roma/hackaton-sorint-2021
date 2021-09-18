import {HopType} from "./hop-type";
import Position from "./position";

export default class Checkpoint implements CheckpointInterface {
    public id: string;
    public shiftId: string;
    public position: Position;
    public sortIndex: number;
    public time: Date;
    public userId: string;
    public hopType: HopType;
}

export interface CheckpointInterface {

    id: string;
    shiftId: string;
    position: Position;
    sortIndex: number;
    time?: Date;
    userId: string;
    hopType: HopType;
}