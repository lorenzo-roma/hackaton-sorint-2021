import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import { ServiceResponse } from "../../models/service-response";
import Checkpoint, { CheckpointDetail } from "../../models/checkpoint";

export default interface ShiftServiceInterface {
    create(shift: Shift): Promise<ServiceResponse<ShiftResult, Shift>>;
    retrieveByUserId(
        id: string
    ): Promise<ServiceResponse<ShiftResult, Shift[]>>;

    retrieveById(id: string): Promise<ServiceResponse<ShiftResult, Shift>>;

    getCheckpointsDetailByShiftId(
        id: string
    ): Promise<ServiceResponse<ShiftResult, CheckpointDetail[]>>;
}
