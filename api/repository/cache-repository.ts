import Checkpoint from "../models/checkpoint";
import checkpoint from "../models/checkpoint";
import Shift from "../models/shift";
import Trip from "../models/trip";
import User from "../models/user";
import CheckpointRepository from "./checkpoint-repository-interface";
import ShiftRepository from "./shift-repository-interface";
import TripRepository from "./trip-repository-interface";
import UserRepository from "./user-repository-interface";

export default class CacheRepository
    implements
        UserRepository,
        TripRepository,
        ShiftRepository,
        CheckpointRepository
{
    private usersCache: Map<string, User> = new Map<string, User>();
    private tripsCache: Map<string, Trip> = new Map<string, Trip>();
    private shiftCache: Map<string, Shift> = new Map<string, Shift>();
    private checkpointsCache: Map<string, Checkpoint> = new Map<
        string,
        Checkpoint
    >();

    async findTripById(id: string): Promise<Trip | undefined> {
        return this.tripsCache.get(id);
    }

    async updateTrip(id: string, trip: Trip): Promise<Trip | undefined> {
        this.tripsCache.set(id, trip);
        return this.tripsCache.get(id);
    }

    async insertCheckpoint(
        checkpoint: checkpoint
    ): Promise<checkpoint | undefined> {
        const newId: string = this.checkpointsCache.size + "";
        checkpoint.id = newId;
        this.checkpointsCache.set(newId, checkpoint);
        return checkpoint;
    }

    async findTripsBetween(
        start: Date,
        end: Date
    ): Promise<Trip[] | undefined> {
        const toReturn: Trip[] = [];
        const trips = this.tripsCache.values();
        let trip: Trip = trips.next().value;
        while (trip) {
            if (trip.endAvailability > start && trip.arrival < end) {
                toReturn.push(trip);
            }
            trip = trips.next().value;
        }
        return toReturn;
    }

    async findShiftById(id: string): Promise<Shift | undefined> {
        return this.shiftCache.get(id);
    }

    async findShiftByUserId(id: string): Promise<Shift[]> {
        const toReturn: Shift[] = [];
        const shifts = this.shiftCache.values();
        let shift: Shift = shifts.next().value;
        while (shift) {
            if (shift.userId == id) toReturn.push(shift);
            shift = shifts.next().value;
        }
        return toReturn;
    }

    async insertShift(shift: Shift): Promise<Shift | undefined> {
        const newId: string = this.shiftCache.size + "";
        shift.setId(newId);
        this.shiftCache.set(newId, shift);
        return shift;
    }

    async findTripsByUserId(id: string): Promise<Trip[]> {
        const toReturn: Trip[] = [];
        const trips = this.tripsCache.values();
        let trip: Trip = trips.next().value;
        while (trip) {
            if (trip.userId == id) toReturn.push(trip);
            trip = trips.next().value;
        }
        return toReturn;
    }

    async insertTrip(trip: Trip): Promise<Trip | undefined> {
        const newId: string = this.tripsCache.size + "";
        trip.id = newId;
        this.tripsCache.set(newId, trip);
        return trip;
    }

    async findUserById(id: string): Promise<User | undefined> {
        return this.usersCache.get(id);
    }

    async findUserByUsername(name: string): Promise<User | undefined> {
        const users = this.usersCache.values();
        let user: User = users.next().value;
        while (user) {
            if (user.username == name) return user;
            user = users.next().value;
        }
    }

    async insertUser(user: User): Promise<User | undefined> {
        const nameAlreadyTaken = await this.findUserByUsername(user.username);
        if (nameAlreadyTaken) return;
        const newId: string = this.usersCache.size + "";
        const newUser: User = new User(user.username, user.password, newId);
        this.usersCache.set(newId, newUser);
        return newUser;
    }
}
