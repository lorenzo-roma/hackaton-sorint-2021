import { Card, Container, FormGroup } from "react-bootstrap";
import { Button, InputText } from "../../components/system/InputText";
import ErrorComponent from "../../components/Error.component";
import LoadingComponent from "../../components/Loading.component";
import useInput from "../../hooks/useInput.hook";
import { NOT_EMPTY_STRING } from "../../utils/Validators";
import { useAppDispatch } from "../../stores/store";
import { useCookies } from "react-cookie";
import { setToken } from "../../stores/auth.store";
import { useLoginMutation } from "../../services/auth.service";
type LoginPageProps = {
    driver: boolean
}
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
        <Container>
            <Card>
                <Card.Body>
                    <FormGroup>
                        <InputText
                            type="text"
                            placeholder="Username"
                            {...usernameInput}
                        />
                        <InputText
                            type="password"
                            placeholder="Password"
                            {...passwordInput}
                        />
                        {isLoading && <LoadingComponent />}
                        {isError && (
                            <ErrorComponent error="Error during login" />
                        )}
                        <Button onClick={onLoginClicked}>Login</Button>
                    </FormGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};
export default LoginPage;
