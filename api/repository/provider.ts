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
