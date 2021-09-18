import Shift from "../models/shift";

export default interface ShiftRepository {
    findShiftByUserId(id: string): Promise<Shift[] | undefined>;
    insertShift(shift: Shift): Promise<Shift | undefined>;
}
