import {Position} from "./Checkpoint.class";

export default interface Trip {
    id: number,
    fromName: string,
    fromPosition: Position,
    toPosition: Position,
    toName: string,
    arrival: Date
}