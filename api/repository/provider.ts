import Position from "../models/position";
import Shift from "../models/shift";
import Trip from "../models/trip";
import User from "../models/user";
import CacheRepository from "./cache-repository";
import Repository from "./user-repository-interface";

export default class RepositoryProvider {
    static repository: CacheRepository;

    static getRepository() {
        if (this.repository == null) {
            this.repository = new CacheRepository();
            this.initTestData();
        }
        return this.repository;
    }

    static async initTestData() {
        const firstUser = new User("lorenzo", "pippo", "lorenzo", "Romagnoni", "+39 3402192392", false, "0");
        const secondUser = new User("davide", "pluto", "Davide", "Campagnola", "+39 3402192392", false, "1");
        const firstTrip = new Trip();
        firstTrip.fromName = "Canegrate, MI";
        firstTrip.toName = "Milano, MI";
        firstTrip.fromPosition = new Position(45.5658897, 8.9242729);
        firstTrip.toPosition = new Position(45.4642035, 9.189982);
        firstTrip.initialAvailability = new Date("2021-09-20T05:30:00.000Z");
        firstTrip.endAvailability = new Date("2021-09-20T06:00:00.000Z");
        firstTrip.arrival = new Date("2021-09-20T07:00:00.000Z");
        firstTrip.userId = "0";
        firstTrip.id = "0";
        const secondTrip = new Trip();
        secondTrip.fromName = "Buccinasco, MI";
        secondTrip.toName = "Crocetta (Metro Linea 3), Milano, MI";
        secondTrip.fromPosition = new Position(45.4210273, 9.119610699999999);
        secondTrip.toPosition = new Position(45.4559805, 9.1957162);
        secondTrip.initialAvailability = new Date("2021-09-20T06:00:00.000Z");
        secondTrip.endAvailability = new Date("2021-09-20T06:30:00.000Z");
        secondTrip.arrival = new Date("2021-09-20T07:00:00.000Z");
        secondTrip.userId = "1";
        secondTrip.id = "1";
        const shift = new Shift();
        shift.start = new Date("2021-09-20T05:00:00.000Z");
        shift.end = new Date("2021-09-20T09:00:00.000Z");
        shift.startingPositionName = "Legnano, MI";
        shift.startingPosition = new Position(45.59435, 8.91758);
        shift.capacity = 5;
        shift.userId = "2";
        shift.id = "1";
        this.repository.insertUser(firstUser);
        this.repository.insertUser(secondUser);
        this.repository.insertTrip(firstTrip);
        this.repository.insertTrip(secondTrip);
        this.repository.insertShift(shift);
    }
}
