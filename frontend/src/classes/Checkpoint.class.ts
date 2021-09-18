import User from "./User.class";

export default interface Checkpoint {
    id: number;
    shiftId: number;
    position: string;
    sortIndex: string;
    user: User;
    pickup: boolean;
}