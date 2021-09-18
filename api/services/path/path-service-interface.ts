import CheckPoint from "../../models/checkpoint";
import PathResult from "../../models/path-result";
import {ServiceResponse} from "../../models/service-response";

export default interface PathServiceInterface {
    calculateForShift(
        id: string
    ): Promise<ServiceResponse<PathResult, CheckPoint[]>>;
}
