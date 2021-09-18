import Checkpoint from "../models/checkpoint";

export default interface CheckPointRepository {
    insertCheckpoint(checkpoint: Checkpoint): Promise<Checkpoint | undefined>;
    findCheckpointsByShiftId(id: string): Promise<Checkpoint[] | undefined>;
}
