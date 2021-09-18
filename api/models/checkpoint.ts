import { HopType } from "./hop-type";
import Position from "./position";

export default class Checkpoint {
    public id: string;
    public shiftId: string;
    public position: Position;
    public sortIndex: number;
    public time: Date;
    public userId: string;
    public hopType: HopType;
}
