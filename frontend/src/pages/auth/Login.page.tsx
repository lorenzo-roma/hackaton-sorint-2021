import { Card, Container, FormGroup } from "react-bootstrap";
import { Button, InputText } from "../../components/system/InputText";
import ErrorComponent from "../../components/Error.component";
import LoadingComponent from "../../components/Loading.component";
import useInput from "../../hooks/useInput.hook";
import { NOT_EMPTY_STRING } from "../../utils/Validators";
import { useAppDispatch } from "../../stores/store";
import { useCookies } from "react-cookie";
import Footer from "../../components/Footer";
import { setToken } from "../../stores/auth.store";
import { useLoginMutation } from "../../services/auth.service";
type LoginPageProps = {
    driver: boolean;
};
const LoginPage = (props: LoginPageProps) => {
    const [cookies, setCookie] = useCookies(["token"]);
    const dispatch = useAppDispatch();
    const usernameInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert an username"),
    ]);
    const passwordInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a password"),
    ]);

    const [doLogin, { isLoading, isError }] = useLoginMutation();

    const onLoginClicked = async () => {
        const result = await doLogin({
            username: usernameInput.value,
            password: passwordInput.value,
        }).unwrap();
        const token: string = result.data.token;
        setCookie("token", token, { path: "/" });
        dispatch(setToken(token));
    };

    return (
        <div className="row" style={{ height: "80vh" }}>
            <div className="h-100 col-6 header1 ">
                <div className="w-75 h-100 d-flex flex-column justify-content-center mx-auto">
                    <div className="h-50">
                        Hop In,<br></br>
                        Hop off<br></br>
                        <div className="body2">
                            Rethink your way to travel daily
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-100 col-6 flex-column d-flex justify-content-center">
                <Card className="p-4 w-75 bg-primary-light">
                    <div className="header1">Login</div>
                    <div className="body1 mt-2">
                        You don't have an account?{" "}
                        <span className="button-font">Sign up!</span>
                    </div>
                    <FormGroup>
                        <label className="body2 fs-6 mt-4 mb-1">Username</label>
                        <InputText
                            type="text"
                            placeholder="Username"
                            {...usernameInput}
                        />
                        <label className="body2 fs-6 mt-3 mb-1">Password</label>
                        <InputText
                            type="password"
                            placeholder="Password"
                            {...passwordInput}
                        />

                        {isLoading && <LoadingComponent />}
                        {isError && (
                            <ErrorComponent error="Error during login" />
                        )}
                        <div className="mt-4 fs-6 d-flex row justify-content-center">
                            <div className="w-50 mt-4 text-center d-flex row button-font">
                                <Button onClick={onLoginClicked}>Login</Button>
                            </div>
                        </div>
                    </FormGroup>{" "}
                </Card>
            </div>
            <Footer />
        </div>
    );
};
export default LoginPage;
