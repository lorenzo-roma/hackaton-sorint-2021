import express from "express";

import { APIResponse } from "../models/api-response";
import Shift from "../models/shift";
import ShiftResult from "../models/shift-result";
import ShiftServiceInterface from "../services/shift/shift-service-interface";

export default class ShiftController {
    constructor(private shiftService: ShiftServiceInterface) {}

    createShift = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const shiftToCreate: Shift = new Shift();
        shiftToCreate.setStart(req.body.start);
        shiftToCreate.setEnd(req.body.end);
        shiftToCreate.setStartingPosition(req.body.starting_position);
        shiftToCreate.setCapacity(req.body.capacity);
        shiftToCreate.setUserId(userId);
        const response: ServiceResponse<ShiftResult, Shift> =
            await this.shiftService.create(shiftToCreate);
        if (response.status != ShiftResult.SUCCESS) return APIResponse.Error();
        return APIResponse.Success(response.data);
    };

    retrieveShifts = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const response: ServiceResponse<ShiftResult, Shift[]> =
            await this.shiftService.retrieveByUserId(userId);
        if (response.status != ShiftResult.SUCCESS) return APIResponse.Error();
        return APIResponse.Success(response.data);
    };
}
