import User from "../models/user";

export default interface Repository {
    findUserById(id: string): Promise<User|undefined>;
    findUserByUsername(id: string): Promise<User|undefined>;
    insertUser(user: User): Promise<User|undefined>;
}   