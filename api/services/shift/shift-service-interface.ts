import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import {ServiceResponse} from "../../models/service-response";

export default interface ShiftServiceInterface {
    create(shift: Shift): Promise<ServiceResponse<ShiftResult, Shift>>;
    retrieveByUserId(
        id: string
    ): Promise<ServiceResponse<ShiftResult, Shift[]>>;
}
