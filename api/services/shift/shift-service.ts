import Shift from "../../models/shift";
import ShiftResult from "../../models/shift-result";
import ShiftRepository from "../../repository/shift-repository-interface";
import CheckPointRepository from "../../repository/checkpoint-repository-interface";
import ShiftServiceInterface from "./shift-service-interface";
import { ServiceResponse } from "../../models/service-response";
import checkpoint, { CheckpointDetail } from "../../models/checkpoint";
import UserRepository from "../../repository/user-repository-interface";

export default class ShiftService implements ShiftServiceInterface {
    constructor(
        private repository: ShiftRepository,
        private checkpointsRepository: CheckPointRepository,
        private userRepository: UserRepository
    ) {}

    async retrieveById(
        id: string
    ): Promise<ServiceResponse<ShiftResult, Shift>> {
        const shift = await this.repository.findShiftById(id);
        if (!shift) return { status: ShiftResult.SHIFT_NOT_FOUND };
        return { status: ShiftResult.SUCCESS, data: shift };
    }

    async getCheckpointsDetailByShiftId(
        id: string
    ): Promise<ServiceResponse<ShiftResult, CheckpointDetail[]>> {
        const checkpoints =
            await this.checkpointsRepository.findCheckpointsByShiftId(id);
        if (!checkpoints)
            return { status: ShiftResult.ERROR_RETRIEVING_CHECKPOINTS };
        const details: CheckpointDetail[] = [];
        for (const checkpoint of checkpoints) {
            const user = await this.userRepository.findUserById(
                checkpoint.userId
            );
            if (!user) return { status: ShiftResult.USER_NOT_FOUND };
            details.push(new CheckpointDetail(checkpoint, user));
        }
        return { status: ShiftResult.SUCCESS, data: details };
    }

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
