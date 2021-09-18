import AuthResult from "../../../models/auth-result";
import User from "../../../models/user";
import AuthService from "../../../services/auth/auth-service";
import jwt from "jwt-simple";
import Repository from "../../../repository/user-repository-interface";

let serviceTested: AuthService;
let mockRepository: Repository;

beforeEach(() => {
    mockRepository = {} as Repository;
    serviceTested = new AuthService(mockRepository);
});

describe("Signup tests", () => {
    test("If user is not already present, it should be successful", async () => {
        const newUser: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(async () => undefined);
        mockRepository.insertUser = jest.fn(async () => newUser);
        const result = await serviceTested.signUp(newUser);
        expect(result.status).toBe(AuthResult.SUCCESS);
        expect(result.data).toBeInstanceOf(User);
        const returnedUser: User = result.data!;
        expect(returnedUser.username).toBe(newUser.username);
        expect(returnedUser.password).toBe(newUser.password);
    });

    test("If user with same name is already present, already present result should be returned", async () => {
        const newUser: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(async () => newUser);
        const result = await serviceTested.signUp(newUser);
        expect(result.status).toBe(AuthResult.ALREADY_SIGN_UP);
    });

    test("If user is not inserted, error during sign up should be returned", async () => {
        const newUser: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(async () => undefined);
        mockRepository.insertUser = jest.fn(async () => undefined);
        const result = await serviceTested.signUp(newUser);
        expect(result.status).toBe(AuthResult.ERROR_DURING_SIGNUP);
    });
});

describe("Login tests", () => {
    test("If user is not registered, return not found", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(async () => undefined);
        const result = await serviceTested.logIn(user);
        expect(result.status).toBe(AuthResult.NOT_FOUND);
    });

    test("If users send wrong password, return wrong password", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(
            async () => new User("test", "wrong", "lorenzo", "Romagnoni", "+39 3402192392", false,)
        );
        const result = await serviceTested.logIn(user);
        expect(result.status).toBe(AuthResult.WRONG_PASSWORD);
    });

    test("If users send correct credential, return success", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        mockRepository.findUserByUsername = jest.fn(async () => user);
        const result = await serviceTested.logIn(user);
        expect(result.status).toBe(AuthResult.SUCCESS);
    });
});

describe("Token tests", () => {
    test("Token retrieve without errors should return success", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        const result = await serviceTested.getToken(user);
        expect(result.status).toBe(AuthResult.SUCCESS);
        expect(result.data!).toBeTruthy();
    });

    test("Token retrieve with errors should return token retrieve errors status", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        jwt.encode = jest.fn(() => {
            throw new Error();
        });
        const result = await serviceTested.getToken(user);
        expect(result.status).toBe(AuthResult.ERROR_RETRIEVING_TOKEN);
    });

    test("Token validation without errors should return success", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        jwt.decode = jest.fn(() => user);
        const result = await serviceTested.verifyToken("token");
        expect(result.status).toBe(AuthResult.SUCCESS);
        expect(result.data).toBe(user);
    });

    test("Token validation with errors should return error verifying token", async () => {
        const user: User = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,);
        jwt.decode = jest.fn(() => {
            throw new Error();
        });
        const result = await serviceTested.verifyToken("token");
        expect(result.status).toBe(AuthResult.ERROR_VALIDATING_TOKEN);
    });
});
