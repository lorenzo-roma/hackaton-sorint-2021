import express from "express";

import { APIResponse } from "../models/api-response";
import PathResult from "../models/path-result";
import CheckPoint from "../models/checkpoint";
import Shift from "../models/shift";
import ShiftResult from "../models/shift-result";
import PathServiceInterface from "../services/path/path-service-interface";
import ShiftServiceInterface from "../services/shift/shift-service-interface";
import Position from "../models/position";
import { ServiceResponse } from "../models/service-response";

export default class ShiftController {
    constructor(
        private shiftService: ShiftServiceInterface,
        private pathService: PathServiceInterface
    ) {}

    createShift = async (req: express.Request): Promise<APIResponse> => {
        const userId = req.user!.id!;
        const shiftToCreate: Shift = new Shift();
        shiftToCreate.setStart(req.body.start);
        shiftToCreate.setEnd(req.body.end);
        shiftToCreate.startingPosition = new Position(
            req.body.startingPositionLat,
            req.body.startingPositionLng
        );
        shiftToCreate.startingPositionName = req.body.startingPositionName;
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

    calculatePath = async (req: express.Request): Promise<APIResponse> => {
        const shiftId = req.params.shiftId;
        const response: ServiceResponse<PathResult, CheckPoint[]> =
            await this.pathService.calculateForShift(shiftId);
        if (response.status != PathResult.SUCCESS) return APIResponse.Error();
        return APIResponse.Success(response.data);
    };
}
