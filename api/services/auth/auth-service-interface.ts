import AuthResult from "../../models/auth-result";
import User from "../../models/user";
import {ServiceResponse} from "../../models/service-response";
import Credential from "../../models/credential";

export default interface AuthServiceInterface {
    signUp(user: User): Promise<ServiceResponse<AuthResult, User>>;
    logIn(user: Credential): Promise<ServiceResponse<AuthResult, User>>;
    getToken(user: User): Promise<ServiceResponse<AuthResult, string>>;
    verifyToken(token: string): Promise<ServiceResponse<AuthResult, User>>;
}
