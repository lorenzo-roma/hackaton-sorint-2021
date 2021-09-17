import express from "express";
import AuthController from "../../controllers/auth-controller";
import { APIResponseStatus } from "../../models/api-response";
import AuthResult from "../../models/auth-result";
import User from "../../models/user";
import AuthServiceInterface from "../../services/auth/auth-service-interface";


let controllerTested: AuthController;
let mockService: AuthServiceInterface;

beforeEach(()=>{
    mockService = {} as AuthServiceInterface;
    controllerTested = new AuthController(mockService);
});


describe("Perform login tests", ()=>{

    test("If auth succeds, and token is retrieved should return success response and token", async ()=>{

        const token = "token";
        mockService.logIn = jest.fn(async (): Promise< ServiceResponse<AuthResult>> =>{
            return {status: AuthResult.SUCCESS}
        });

        mockService.getToken = jest.fn(async (): Promise< ServiceResponse<AuthResult, string>> =>{
            return {status: AuthResult.SUCCESS, data: token}
        });

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;
        const response = await controllerTested.performLogin(mockReq);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual({token});
    });

    test("If auth succeds, and token is not retrieved should return error response", async ()=>{

        mockService.logIn = jest.fn(async (): Promise< ServiceResponse<AuthResult>> =>{
            return {status: AuthResult.SUCCESS}
        });

        mockService.getToken = jest.fn(async (): Promise< ServiceResponse<AuthResult, string>> =>{
            return {status: AuthResult.ERROR_RETRIEVING_TOKEN}
        });

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;
        const response = await controllerTested.performLogin(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });

    test("If auth does not succed, should return error response", async ()=>{

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;


        mockService.logIn = jest.fn(async (): Promise< ServiceResponse<AuthResult>> =>{
            return {status: AuthResult.NOT_FOUND}
        });

        let response = await controllerTested.performLogin(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);

        mockService.logIn = jest.fn(async (): Promise< ServiceResponse<AuthResult>> =>{
            return {status: AuthResult.WRONG_PASSWORD}
        });

        response = await controllerTested.performLogin(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);

    });

});

describe("Perform signup tests", ()=>{

    test("If signup succeds, and token is retrieved should return success response and user registere token", async ()=>{

        const token = "token";
        mockService.signUp = jest.fn(async (): Promise< ServiceResponse<AuthResult, User>> =>{
            return {status: AuthResult.SUCCESS}
        });

        mockService.getToken = jest.fn(async (): Promise< ServiceResponse<AuthResult, string>> =>{
            return {status: AuthResult.SUCCESS, data: token}
        });

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;
        const response = await controllerTested.performSignup(mockReq);
        expect(response.status).toBe(APIResponseStatus.SUCCESS);
        expect(response.data).toStrictEqual({token});
    });

    test("If signup succeds, and token is not retrieved should return error response", async ()=>{

        mockService.signUp = jest.fn(async (): Promise< ServiceResponse<AuthResult, User>> =>{
            return {status: AuthResult.SUCCESS}
        });

        mockService.getToken = jest.fn(async (): Promise< ServiceResponse<AuthResult, string>> =>{
            return {status: AuthResult.ERROR_RETRIEVING_TOKEN}
        });

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;
        const response = await controllerTested.performSignup(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);
    });

    test("If signup does not succed, should return error response", async ()=>{

        const user: User = new User("test", "password");
        const mockReq = {
            body:{
                "username": user.username,
                "password": user.password
            }
        } as express.Request;

        mockService.signUp = jest.fn(async (): Promise< ServiceResponse<AuthResult, User>> =>{
            return {status: AuthResult.ALREADY_SIGN_UP}
        });

        let response = await controllerTested.performSignup(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);

        mockService.signUp = jest.fn(async (): Promise< ServiceResponse<AuthResult, User>> =>{
            return {status: AuthResult.ERROR_DURING_SIGNUP}
        });

        response = await controllerTested.performSignup(mockReq);
        expect(response.status).toBe(APIResponseStatus.ERROR);

    });


});