import CheckPoint from "../../models/checkpoint";
import PathResult from "../../models/path-result";

export default interface PathServiceInterface {
    calculateForShift(
        id: string
    ): Promise<ServiceResponse<PathResult, CheckPoint[]>>;
}
