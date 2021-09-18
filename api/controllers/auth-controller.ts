import AuthServiceInterface from "../services/auth/auth-service-interface";
import express from "express";
import AuthResult from "../models/auth-result";
import User from "../models/user";
import { APIResponse } from "../models/api-response";
import {ServiceResponse} from "../models/service-response";
import Credential from "../models/credential";

export default class AuthController {
    constructor(private authService: AuthServiceInterface) {}

    performLogin = async (req: express.Request): Promise<APIResponse> => {
        const username = req.body.username;
        const password = req.body.password;
        const user: Credential = { username, password };
        const response = await this.authService.logIn(user);
        if (response.status != AuthResult.SUCCESS) return APIResponse.Error();
        const tokenResult: ServiceResponse<AuthResult, string> =
            await this.authService.getToken(response.data!);
        if (tokenResult.status != AuthResult.SUCCESS)
            return APIResponse.Error();
        return APIResponse.Success({ token: tokenResult.data });
    };

    performSignup = async (req: express.Request): Promise<APIResponse> => {
        const username = req.body.username;
        const password = req.body.password;
        const name = req.body.name;
        const surname = req.body.surname;
        const phoneNumber = req.body.phoneNumber;
        const driver = req.body.driver;
        const user: User = { username, password, name, surname, phoneNumber, driver };
        const response: ServiceResponse<AuthResult, User> =
            await this.authService.signUp(user);
        if (response.status != AuthResult.SUCCESS) return APIResponse.Error();
        const tokenResult: ServiceResponse<AuthResult, string> =
            await this.authService.getToken(response.data!);
        if (tokenResult.status != AuthResult.SUCCESS)
            return APIResponse.Error();
        return APIResponse.Success({ token: tokenResult.data });
    };
    performMe = async (req: express.Request): Promise<APIResponse> => {
        return APIResponse.Success(req.user);
    };
}
