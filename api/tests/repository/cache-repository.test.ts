import User from "../../models/user";
import CacheRepository from "../../repository/cache-repository";
import Repository from "../../repository/repository-interface";

let repositoryTested: Repository;

beforeEach(()=>{
    repositoryTested = new CacheRepository();
});

describe("Find user tests", ()=>{

    test("Find by id when user is not present should return undefined", async ()=>{
        const user: User = new User("test", "password", "1");
        const result = await repositoryTested.findUserById(user.id!);
        expect(result).toBeUndefined();
    }); 

    test("Find by id when user is present should return the user", async ()=>{
        const user: User = new User("test", "password");
        const inserted: User|undefined = await repositoryTested.insertUser(user);
        const result = await repositoryTested.findUserById(inserted!.id!);
        expect(result).toBe(inserted);
    }); 

    test("Find by username when user is not present should return undefined", async ()=>{
        const user: User = new User("test", "password", "1");
        const result = await repositoryTested.findUserByUsername(user.username);
        expect(result).toBeUndefined();
    }); 

    test("Find by username when user is present should return the user", async ()=>{
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        const result = await repositoryTested.findUserByUsername(inserted!.username);
        expect(result).toBe(inserted);
    }); 


});

describe("Insert user tests", ()=>{

    test("Insertion of new user should return inserted user with new id", async()=>{
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newUser: User = new User("second", "password");
        const newInserted = await repositoryTested.insertUser(newUser);
        expect(newInserted).toBeTruthy();
        expect(newInserted!.id).toBe("1");
    });

    test("Insertion of new user when username is already taken should return undefined", async()=>{
        const user: User = new User("test", "password");
        const inserted = await repositoryTested.insertUser(user);
        expect(inserted).toBeTruthy();
        expect(inserted!.id).toBe("0");
        const newUser: User = new User("test", "password");
        const newInserted = await repositoryTested.insertUser(newUser);
        expect(newInserted).toBeUndefined();
    });

});