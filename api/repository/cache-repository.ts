import User from "../models/user";
import Repository from "./repository-interface";

export default class CacheRepository implements Repository {

    private usersCache: Map<string, User> = new Map<string, User>();

    async findUserById(id: string): Promise<User|undefined> {
        return this.usersCache.get(id);
    }

    async findUserByUsername(name: string): Promise<User|undefined> {
        const users = this.usersCache.values();
        let user: User = users.next().value;
        while(user){
            if(user.username==name) return user;
            user = users.next().value;
        }
    }

    async insertUser(user: User): Promise<User|undefined> {
        const nameAlreadyTaken = await this.findUserByUsername(user.username);
        if(nameAlreadyTaken) return;
        const newId: string = this.usersCache.size + "";
        const newUser: User = new User(user.username, user.password, newId);
        this.usersCache.set(newId, newUser);
        return newUser;
    }


}