import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/Home.page";
import NavbarComponent from "./components/Navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/auth/Login.page";
import { useAppSelector } from "./stores/store";
import { AuthState, selectAuthState } from "./stores/auth.store";
import SignupPage from "./pages/auth/Signup.page";

function App() {
    const authState = useAppSelector(selectAuthState);
    return (
        <Router>
            <NavbarComponent />
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                {authState == AuthState.LOGGED_IN && <Redirect to="/" />}
                {authState == AuthState.LOGGED_OUT && <LoginPage />}
            </Route>
            <Route exact path="/signup">
                {authState == AuthState.LOGGED_IN && <Redirect to="/" />}
                {authState == AuthState.LOGGED_OUT && <SignupPage />}
            </Route>
        </Router>
    );
}

export default App;
