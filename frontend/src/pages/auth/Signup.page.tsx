import {Card, Container, FormGroup} from "react-bootstrap";
import ErrorComponent from "../../components/Error.component";
import LoadingComponent from "../../components/Loading.component";
import {Button, InputText} from "../../components/system/InputText";
import useInput from "../../hooks/useInput.hook";
import {useSignupMutation} from "../../services/auth.service";
import {NOT_EMPTY_STRING} from "../../utils/Validators";
import {useCookies} from "react-cookie";
import {setToken} from "../../stores/auth.store";
import {useAppDispatch} from "../../stores/store";

const SignupPage = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(["token"]);

    const usernameInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert an username"),
    ]);
    const passwordInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a password"),
    ]);

    const [doSignup, {isLoading, isError}] = useSignupMutation();

    const onSignupClicked = async () => {
        try {
            const result = await doSignup({
                username: usernameInput.value,
                password: passwordInput.value,
            }).unwrap();
            const token: string = result.data.token;
            setCookie("token", token, {path: "/"});
            dispatch(setToken(token));
        } catch (e) {
            console.error(e);
        }
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
                        {isLoading && <LoadingComponent/>}
                        {isError && (
                            <ErrorComponent error="Error during signup"/>
                        )}
                        <Button onClick={onSignupClicked}>Signup</Button>
                    </FormGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignupPage;
