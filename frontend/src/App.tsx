import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import HomePage from "./pages/Home.page";
import NavbarComponent from "./components/Navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LoginPage from "./pages/auth/Login.page";
import {useAppSelector} from "./stores/store";
import {AuthState, selectAuthState} from "./stores/auth.store";
import SignupPage from "./pages/auth/Signup.page";
import HomePagePrivate from "./pages/HomePagePrivate.page";

function App() {
    const authState = useAppSelector(selectAuthState);
    return (
        <Router>
            <NavbarComponent/>
            <Route exact path="/" render={(props) => {
                const state = (props.location.state || {}) as any;
                return (
                    <>
                        {authState === AuthState.LOGGED_IN &&
                        <HomePagePrivate initialFrom={state.initialFrom} initialTo={state.initialTo}/>}
                        {(authState === AuthState.LOGGED_OUT && state.initialFrom && state.initialTo) && <SignupPage />}
                        {authState === AuthState.LOGGED_OUT && <HomePage/>}
                    </>
                );
            }}>

            </Route>
            <Route exact path="/login">
                {authState == AuthState.LOGGED_IN && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_OUT && <LoginPage/>}
            </Route>
            <Route exact path="/signup">
                {authState == AuthState.LOGGED_IN && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_OUT && <SignupPage/>}
            </Route>
        </Router>
    );
}

export default App;
