import Shift from "../models/shift";
import Trip from "../models/trip";
import User from "../models/user";
import ShiftRepository from "./shift-repository";
import TripRepository from "./trip-repository-interface";
import UserRepository from "./user-repository-interface";

export default class CacheRepository
    implements UserRepository, TripRepository, ShiftRepository
{
    private usersCache: Map<string, User> = new Map<string, User>();
    private tripsCache: Map<string, Trip> = new Map<string, Trip>();
    private shiftCache: Map<string, Shift> = new Map<string, Shift>();

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

    async findTripByUserId(id: string): Promise<Trip[]> {
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
        trip.setId(newId);
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
