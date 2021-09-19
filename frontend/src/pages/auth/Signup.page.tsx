import { Card, Container, FormGroup } from "react-bootstrap";
import ErrorComponent from "../../components/Error.component";
import LoadingComponent from "../../components/Loading.component";
import { Button, InputText } from "../../components/system/InputText";
import useInput from "../../hooks/useInput.hook";
import { useSignupMutation } from "../../services/auth.service";
import { NOT_EMPTY_STRING, PHONE_NUMBER } from "../../utils/Validators";
import { useCookies } from "react-cookie";
import { setToken } from "../../stores/auth.store";
import { useAppDispatch } from "../../stores/store";

type SignupPageProps = {
    driver: boolean;
};
const SignupPage = (props: SignupPageProps) => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies(["token"]);

    const usernameInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert an username"),
    ]);
    const passwordInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a password"),
    ]);
    const nameInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a name"),
    ]);
    const surnameInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a surname"),
    ]);
    const phoneNumberInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("Insert a phone number with prefix"),
        PHONE_NUMBER.withPrintable("Insert a phone number with prefix"),
    ]);

    const [doSignup, { isLoading, isError }] = useSignupMutation();

    const isFormValid = () =>
        !(
            usernameInput.hasErrors ||
            passwordInput.hasErrors ||
            phoneNumberInput.hasErrors ||
            surnameInput.hasErrors ||
            nameInput.hasErrors
        );

    const onSignupClicked = async () => {
        if (!isFormValid()) return;
        try {
            const result = await doSignup({
                username: usernameInput.value,
                password: passwordInput.value,
                name: nameInput.value,
                surname: surnameInput.value,
                phoneNumber: phoneNumberInput.value,
                driver: props.driver,
            }).unwrap();
            const token: string = result.data.token;
            setCookie("token", token, { path: "/" });
            dispatch(setToken(token));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="mx-4 h-75 row align-items-center">
            <div className="col">
                <Card className="p-4">
                    <FormGroup className="sanserif">
                        <label className="serif black fs-6 mb-1">
                            Username
                        </label>
                        <InputText
                            type="text"
                            placeholder="Username"
                            {...usernameInput}
                        />
                        <label className="serif black fs-6 mt-3 mb-1">
                            Password
                        </label>
                        <InputText
                            type="password"
                            placeholder="Password"
                            {...passwordInput}
                        />
                        <label className="serif black fs-6 mt-3 mb-1">
                            Name
                        </label>
                        <InputText
                            type="text"
                            placeholder="Name"
                            {...nameInput}
                        />
                        <label className="serif black fs-6 mt-3 mb-1">
                            Surname
                        </label>

                        <InputText
                            type="text"
                            placeholder="Surname"
                            {...surnameInput}
                        />
                        <label className="serif black fs-6 mt-3 mb-1">
                            Phone Number
                        </label>

                        <InputText
                            type="tel"
                            placeholder="Phone Number"
                            {...phoneNumberInput}
                        />
                        {isLoading && <LoadingComponent />}
                        {isError && (
                            <ErrorComponent error="Error during signup" />
                        )}
                        <div className="mt-4">
                            <Button onClick={onSignupClicked}>Signup</Button>
                        </div>
                    </FormGroup>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;
