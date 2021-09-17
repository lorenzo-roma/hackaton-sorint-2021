import AuthServiceInterface from "../services/auth/auth-service-interface";
import express from "express";
import AuthResult from "../models/auth-result";
import User from "../models/user";
import { APIResponse } from "../models/api-response";

export default class AuthController {
  constructor(private authService: AuthServiceInterface) {}

  performLogin = async (req: express.Request): Promise<APIResponse> => {
    const username = req.body.username;
    const password = req.body.password;
    const user: User = { username, password };
    const response: ServiceResponse<AuthResult> = await this.authService.logIn(
      user
    );
    if (response.status != AuthResult.SUCCESS) return APIResponse.Error();
    const tokenResult: ServiceResponse<AuthResult, string> =
      await this.authService.getToken(user);
    if (tokenResult.status != AuthResult.SUCCESS) return APIResponse.Error();
    return APIResponse.Success({ token: tokenResult.data });
  };

  performSignup = async (req: express.Request): Promise<APIResponse> => {
    const username = req.body.username;
    const password = req.body.password;
    const user: User = { username, password };
    const response: ServiceResponse<AuthResult, User> =
      await this.authService.signUp(user);
    if (response.status != AuthResult.SUCCESS) return APIResponse.Error();
    const tokenResult: ServiceResponse<AuthResult, string> =
      await this.authService.getToken(user);
    if (tokenResult.status != AuthResult.SUCCESS) return APIResponse.Error();
    return APIResponse.Success({ token: tokenResult.data });
  };
}
