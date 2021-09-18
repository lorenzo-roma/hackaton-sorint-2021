import Trip from "../models/trip";
import User from "../models/user";
import TripRepository from "./trip-repository-interface";
import UserRepository from "./user-repository-interface";

export default class CacheRepository implements UserRepository, TripRepository {
    private usersCache: Map<string, User> = new Map<string, User>();
    private tripsCache: Map<string, Trip> = new Map<string, Trip>();

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
