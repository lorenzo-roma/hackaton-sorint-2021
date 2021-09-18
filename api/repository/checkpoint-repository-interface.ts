import Checkpoint from "../models/checkpoint";

export default interface CheckPointRepository {
    insertCheckpoint(checkpoint: Checkpoint): Promise<Checkpoint | undefined>;
}
