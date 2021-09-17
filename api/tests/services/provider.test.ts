import AuthService from "../../services/auth/auth-service";
import AuthServiceInterface from "../../services/auth/auth-service-interface";
import ServiceProvider from "../../services/provider";


describe("Provide service instances", ()=>{

    test("Provide valid auth service", ()=>{
        const authService: AuthServiceInterface = ServiceProvider.getAuthService();
        expect(authService).toBeTruthy();
        expect(authService).toBeInstanceOf(AuthService)
    });

    test("Provide always the same instance of auth service", ()=>{
        const authService: AuthServiceInterface = ServiceProvider.getAuthService();
        const secondAuthService: AuthServiceInterface = ServiceProvider.getAuthService();
        expect(secondAuthService).toBe(authService);
    });


})