import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import ShiftRepository from "../../repository/shift-repository-interface";
import ShiftServiceInterface from "./shift-service-interface";
import {ServiceResponse} from "../../models/service-response";

export default class ShiftService implements ShiftServiceInterface {
    constructor(private repository: ShiftRepository) {}

    async create(shift: Shift): Promise<ServiceResponse<ShiftResult, Shift>> {
        const inserted = await this.repository.insertShift(shift);
        if (inserted) return { status: ShiftResult.SUCCESS, data: inserted };
        return { status: ShiftResult.ERROR_DURING_CREATION };
    }
    async retrieveByUserId(
        id: string
    ): Promise<ServiceResponse<ShiftResult, Shift[]>> {
        const trips = await this.repository.findShiftByUserId(id);
        if (trips) return { status: ShiftResult.SUCCESS, data: trips };
        return { status: ShiftResult.ERROR_RETRIEVING_SHIFTS };
    }
}
