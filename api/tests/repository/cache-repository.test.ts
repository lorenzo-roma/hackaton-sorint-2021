import Shift from "../../models/shift";
import Trip from "../../models/trip";
import User from "../../models/user";
import CacheRepository from "../../repository/cache-repository";
import Repository from "../../repository/user-repository-interface";
import { getMockShift, getMockTrip } from "../mocks";

let repositoryTested: CacheRepository;

beforeEach(() => {
    repositoryTested = new CacheRepository();
});

describe("Find user tests", () => {
    test("Find by id when user is not present should return undefined", async () => {
        const user: User = new User("test", "password", "1");
        const result = await repositoryTested.findUserById(user.id!);
        expect(result).toBeUndefined();
    });

    test("Find by id when user is present should return the user", async () => {
        const user: User = new User("test", "password");
        const inserted: User | undefined = await repositoryTested.insertUser(
            user
        );
        const result = await repositoryTested.findUserById(inserted!.id!);
        expect(result).toBe(inserted);
    });

    test("Find by username when user is not present should return undefined", async () => {
        const user: User = new User("test", "password", "1");
        const result = await repositoryTested.findUserByUsername(user.username);
        expect(result).toBeUndefined();
    });

    test("Find by username when user is present should return the user", async () => {
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        const result = await repositoryTested.findUserByUsername(
            inserted!.username
        );
        expect(result).toBe(inserted);
    });
});

describe("Insert user tests", () => {
    test("Insertion of new user should return inserted user with new id", async () => {
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newUser: User = new User("second", "password");
        const newInserted = await repositoryTested.insertUser(newUser);
        expect(newInserted).toBeTruthy();
        expect(newInserted!.id).toBe("1");
    });

    test("Insertion of new user when username is already taken should return undefined", async () => {
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newUser: User = new User("test", "password");
        const newInserted = await repositoryTested.insertUser(newUser);
        expect(newInserted).toBeUndefined();
    });
});

describe("Insert trip tests", () => {
    test("Insertion of new trip should return inserted trip with new id", async () => {
        const trip: Trip = getMockTrip();
        const inserted = await repositoryTested.insertTrip(trip);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newTrip: Trip = getMockTrip();
        const newInserted = await repositoryTested.insertTrip(newTrip);
        expect(newInserted).toBeTruthy();
        expect(newInserted!.id).toBe("1");
    });
});

describe("Find trip tests", () => {
    test("Find by user id when is empty should return empty array", async () => {
        const result = await repositoryTested.findTripsByUserId("0");
        expect(result).toStrictEqual([]);
    });

    test("Find by user id when has elements should return elements with same user id", async () => {
        const first: Trip = getMockTrip();
        const second: Trip = getMockTrip();
        const shouldNotBePresent: Trip = getMockTrip();
        const userIdToFind = "0";
        first.setUserId(userIdToFind);
        second.setUserId(userIdToFind);
        shouldNotBePresent.setUserId("1");
        repositoryTested.insertTrip(first);
        repositoryTested.insertTrip(second);
        repositoryTested.insertTrip(shouldNotBePresent);
        const result = await repositoryTested.findTripsByUserId(userIdToFind);
        expect(result[0]).toBe(first);
        expect(result[1]).toBe(second);
        expect(result.length).toBe(2);
    });

    test("Find by user id when user id is not present should return empty array", async () => {
        const first: Trip = getMockTrip();
        const second: Trip = getMockTrip();
        const shouldNotBePresent: Trip = getMockTrip();
        const userIdToFind = "0";
        first.setUserId("2");
        second.setUserId("3");
        shouldNotBePresent.setUserId("1");
        repositoryTested.insertTrip(first);
        repositoryTested.insertTrip(second);
        repositoryTested.insertTrip(shouldNotBePresent);
        const result = await repositoryTested.findTripsByUserId(userIdToFind);
        expect(result).toStrictEqual([]);
    });
});

describe("Insert shift tests", () => {
    test("Insertion of new shift should return inserted shift with new id", async () => {
        const shift: Shift = getMockShift();
        const inserted = await repositoryTested.insertShift(shift);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newShift: Shift = getMockShift();
        const newInserted = await repositoryTested.insertShift(newShift);
        expect(newInserted).toBeTruthy();
        expect(newInserted!.id).toBe("1");
    });
});

describe("Find trip tests", () => {
    test("Find by user id when is empty should return empty array", async () => {
        const result = await repositoryTested.findShiftByUserId("0");
        expect(result).toStrictEqual([]);
    });

    test("Find by user id when has elements should return elements with same user id", async () => {
        const first: Shift = getMockShift();
        const second: Shift = getMockShift();
        const shouldNotBePresent: Shift = getMockShift();
        const userIdToFind = "0";
        first.setUserId(userIdToFind);
        second.setUserId(userIdToFind);
        shouldNotBePresent.setUserId("1");
        repositoryTested.insertShift(first);
        repositoryTested.insertShift(second);
        repositoryTested.insertShift(shouldNotBePresent);
        const result = await repositoryTested.findShiftByUserId(userIdToFind);
        expect(result[0]).toBe(first);
        expect(result[1]).toBe(second);
        expect(result.length).toBe(2);
    });

    test("Find by user id when user id is not present should return empty array", async () => {
        const first: Shift = getMockShift();
        const second: Shift = getMockShift();
        const shouldNotBePresent: Shift = getMockShift();
        const userIdToFind = "0";
        first.setUserId("2");
        second.setUserId("3");
        shouldNotBePresent.setUserId("1");
        repositoryTested.insertShift(first);
        repositoryTested.insertShift(second);
        repositoryTested.insertShift(shouldNotBePresent);
        const result = await repositoryTested.findShiftByUserId(userIdToFind);
        expect(result).toStrictEqual([]);
    });
});

describe("Find trips between tests", () => {
    test("If no trip is available, it should return empty array", () => {
        const result = repositoryTested.findTripsBetween(
            new Date(),
            new Date()
        );
        expect(result).toStrictEqual([]);
    });

    test("If all trips are out of bound, it should return empty array", async () => {
        const firstTrip: Trip = getMockTrip();
        firstTrip.setEndAvailability(new Date("2021/01/01 10:00:00"));
        firstTrip.setArrival(new Date("2021/01/01 11:00:00"));
        await repositoryTested.insertTrip(firstTrip);
        const secondTrip: Trip = getMockTrip();
        secondTrip.setEndAvailability(new Date("2021/12/01 10:00:00"));
        secondTrip.setArrival(new Date("2021/12/01 11:00:00"));
        await repositoryTested.insertTrip(secondTrip);
        const result = repositoryTested.findTripsBetween(
            new Date(),
            new Date()
        );
        expect(result).toStrictEqual([]);
    });

    test("If all trips are inside of bound, it should return all trips", async () => {
        const firstTrip: Trip = getMockTrip();
        firstTrip.setEndAvailability(new Date("2021/02/01 10:00:00"));
        firstTrip.setArrival(new Date("2021/02/01 11:00:00"));
        await repositoryTested.insertTrip(firstTrip);
        const secondTrip: Trip = getMockTrip();
        secondTrip.setEndAvailability(new Date("2021/03/01 10:00:00"));
        secondTrip.setArrival(new Date("2021/03/01 11:00:00"));
        await repositoryTested.insertTrip(secondTrip);
        const result = repositoryTested.findTripsBetween(
            new Date("2021/01/01 10:00:00"),
            new Date("2021/12/30 10:00:00")
        );
        expect(result).toStrictEqual([firstTrip, secondTrip]);
    });

    test("If some trips are inside of bound, it should return only them", async () => {
        const firstTrip: Trip = getMockTrip();
        firstTrip.setEndAvailability(new Date("2021/02/01 10:00:00"));
        firstTrip.setArrival(new Date("2021/02/01 11:00:00"));
        await repositoryTested.insertTrip(firstTrip);
        const secondTrip: Trip = getMockTrip();
        secondTrip.setEndAvailability(new Date("2021/03/01 10:00:00"));
        secondTrip.setArrival(new Date("2021/03/01 11:00:00"));
        await repositoryTested.insertTrip(secondTrip);
        const result = repositoryTested.findTripsBetween(
            new Date("2021/02/01 09:00:00"),
            new Date("2021/02/28 10:00:00")
        );
        expect(result).toStrictEqual([firstTrip]);
    });
});
