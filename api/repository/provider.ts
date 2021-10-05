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
        }
        return this.repository;
    }
}
