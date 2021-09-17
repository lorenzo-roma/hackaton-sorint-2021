import CacheRepository from "./cache-repository";
import Repository from "./repository-interface";

export default class RepositoryProvider {

    static repository: Repository;

    static getRepository(){
        if(this.repository==null){
            this.repository = new CacheRepository();
        }
        return this.repository;
    }

}