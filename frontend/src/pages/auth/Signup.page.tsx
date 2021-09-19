import { Card, Container, FormGroup } from "react-bootstrap";
import ErrorComponent from "../../components/Error.component";
import LoadingComponent from "../../components/Loading.component";
import { Button, InputText } from "../../components/system/InputText";
import useInput from "../../hooks/useInput.hook";
import { useSignupMutation } from "../../services/auth.service";
import { NOT_EMPTY_STRING, PHONE_NUMBER } from "../../utils/Validators";
import { useCookies } from "react-cookie";
import Footer from "../../components/Footer";
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
        <div>
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
                        <div className="header1">Signup</div>
                        <FormGroup>
                            <label className="body2 fs-6 mt-4 mb-1">
                                Username
                            </label>
                            <InputText
                                type="text"
                                placeholder="Username"
                                {...usernameInput}
                            />
                            <label className="body2 fs-6 mt-4 mb-1">
                                Password
                            </label>
                            <InputText
                                type="password"
                                placeholder="Password"
                                {...passwordInput}
                            />
                            <label className="body2 fs-6 mt-4 mb-1">Name</label>
                            <InputText
                                type="text"
                                placeholder="Name"
                                {...nameInput}
                            />
                            <label className="body2 fs-6 mt-4 mb-1">
                                Surname
                            </label>
                            <InputText
                                type="text"
                                placeholder="Surname"
                                {...surnameInput}
                            />
                            <label className="body2 fs-6 mt-4 mb-1">
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
                            <div className="mt-4 fs-6 d-flex row justify-content-center">
                                <div className="w-50 mt-4 text-center d-flex row button-font">
                                    {" "}
                                    <Button onClick={onSignupClicked}>
                                        Signup
                                    </Button>
                                </div>
                            </div>{" "}
                        </FormGroup>
                    </Card>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default SignupPage;
