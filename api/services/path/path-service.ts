import checkpoint from "../../models/checkpoint";
import PathResult from "../../models/path-result";
import PathServiceInterface from "./path-service-interface";

export default class PathService implements PathServiceInterface {
    calculateForShift(
        id: string
    ): Promise<ServiceResponse<PathResult, checkpoint[]>> {
        throw new Error("Method not implemented.");
    }
}
