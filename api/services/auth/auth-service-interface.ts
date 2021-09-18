import AuthResult from "../../models/auth-result";
import User from "../../models/user";

export default interface AuthServiceInterface {
    signUp(user: User): Promise<ServiceResponse<AuthResult, User>>;
    logIn(user: User): Promise<ServiceResponse<AuthResult, User>>;
    getToken(user: User): Promise<ServiceResponse<AuthResult, string>>;
    verifyToken(token: string): Promise<ServiceResponse<AuthResult, User>>;
}
