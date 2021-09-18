import User from "../../models/user";
import UserRepository from "../../repository/user-repository-interface";
import AuthServiceInterface from "./auth-service-interface";
import jwt from "jwt-simple";
import config from "../../config";
import AuthResult from "../../models/auth-result";
import {ServiceResponse} from "../../models/service-response";

export default class AuthService implements AuthServiceInterface {
    constructor(private repository: UserRepository) {}

    async signUp(user: User): Promise<ServiceResponse<AuthResult, User>> {
        const userWithSameName = await this.repository.findUserByUsername(
            user.username
        );
        if (userWithSameName != null)
            return { status: AuthResult.ALREADY_SIGN_UP };
        const inserted = await this.repository.insertUser(user);
        if (inserted) return { status: AuthResult.SUCCESS, data: inserted };
        return { status: AuthResult.ERROR_DURING_SIGNUP };
    }

    async logIn(user: User): Promise<ServiceResponse<AuthResult, User>> {
        const userToAuth = await this.repository.findUserByUsername(
            user.username
        );
        if (userToAuth == null) return { status: AuthResult.NOT_FOUND };
        if (userToAuth.password != user.password)
            return { status: AuthResult.WRONG_PASSWORD };
        return { status: AuthResult.SUCCESS, data: userToAuth };
    }

    async getToken(user: User): Promise<ServiceResponse<AuthResult, string>> {
        try {
            const token: string = jwt.encode(user, config.auth_secret);
            return { status: AuthResult.SUCCESS, data: token };
        } catch (e) {
            return { status: AuthResult.ERROR_RETRIEVING_TOKEN };
        }
    }

    async verifyToken(
        token: string
    ): Promise<ServiceResponse<AuthResult, User>> {
        try {
            const user: User = jwt.decode(token, config.auth_secret);
            return { status: AuthResult.SUCCESS, data: user };
        } catch (e) {
            return { status: AuthResult.ERROR_VALIDATING_TOKEN };
        }
    }
}
