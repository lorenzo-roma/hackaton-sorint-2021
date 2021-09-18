import Checkpoint from "./checkpoint";

export interface Tour {
    count: number;
    feasible: boolean;
    checkpoints: Checkpoint[];
}
