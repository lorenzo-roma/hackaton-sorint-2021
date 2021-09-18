import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/Home.page";
import NavbarComponent from "./components/Navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LoginPage from "./pages/auth/Login.page";
import {useAppDispatch, useAppSelector} from "./stores/store";
import {AuthState, selectAuthState, setUser} from "./stores/auth.store";
import SignupPage from "./pages/auth/Signup.page";
import HomePagePrivate from "./pages/HomePagePrivate.page";
import DriverPublicPage from "./pages/driver/DriverPublic.page";
import DriverPrivatePage from "./pages/driver/DriverPrivate.page";
import CreateShiftPage from "./pages/driver/shift/Create.page";
import ShiftDetailPage from "./pages/driver/shift/Detail.page";
import {useEffect} from "react";
import {useRetrieveMeMutation} from "./services/user.service";

function App() {
    const authState = useAppSelector(selectAuthState);
    const authStore = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [doRetrieveMe] = useRetrieveMeMutation();
    useEffect(() => {
        if (authState === AuthState.LOGGED_IN && !authStore.user) {
            doRetrieveMe().unwrap().then((res) => dispatch(setUser(res)));
        }
    }, [doRetrieveMe, authStore, authState, dispatch]);
    console.log("DRIVER?",authStore.user)
    return (
        <Router>
            <Switch>
                <Route path="/driver">
                    <NavbarComponent driver={true}/>
                </Route>
                <Route>
                    <NavbarComponent driver={false}/>
                </Route>
            </Switch>
            <Route exact path="/" render={(props) => {
                const state = (props.location.state || {}) as any;
                return (
                    <>
                        {authState === AuthState.LOGGED_IN && !authStore.user?.driver &&
                        <HomePagePrivate initialFrom={state.initialFrom} initialTo={state.initialTo}/>}
                        {authState === AuthState.LOGGED_IN && authStore.user?.driver &&
                        <Redirect to="/driver"/>}
                        {(authState === AuthState.LOGGED_OUT && state.initialFrom && state.initialTo) &&
                        <SignupPage driver={false}/>}
                        {authState === AuthState.LOGGED_OUT && !state.initialFrom && !state.initialTo && <HomePage/>}
                    </>
                );
            }}>

            </Route>
            <Route exact path="/login">
                {authState == AuthState.LOGGED_IN && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_OUT && <LoginPage driver={false}/>}
            </Route>
            <Route exact path="/signup">
                {authState == AuthState.LOGGED_IN && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_OUT && <SignupPage driver={false}/>}
            </Route>
            <Route exact path="/driver">
                {(authState == AuthState.LOGGED_OUT || !authStore.user?.driver) && <DriverPublicPage/>}
                {authState == AuthState.LOGGED_IN && authStore.user?.driver && <DriverPrivatePage/>}
            </Route>
            <Route exact path="/driver/login">
                {authState == AuthState.LOGGED_IN && !authStore.user?.driver && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_IN && authStore.user?.driver && <Redirect to="/driver/"/>}
                {authState == AuthState.LOGGED_OUT && <LoginPage driver={true}/>}
            </Route>
            <Route exact path="/driver/signup">
                {authState == AuthState.LOGGED_IN && !authStore.user?.driver && <Redirect to="/"/>}
                {authState == AuthState.LOGGED_IN && authStore.user?.driver && <Redirect to="/driver/"/>}
                {authState == AuthState.LOGGED_OUT && <SignupPage driver={true}/>}
            </Route>
            <Route exact path="/driver/create-shift">
                {authState == AuthState.LOGGED_OUT && <Redirect to="/driver"/>}
                {authState == AuthState.LOGGED_IN && authStore.user?.driver && <CreateShiftPage/>}
            </Route>
            <Route exact path="/driver/shift/:id" render={({match}) => {
                const idNumber = parseInt(match.params.id);
                if (authState == AuthState.LOGGED_OUT || isNaN(idNumber)) return <Redirect to="/driver"/>
                if (authStore.user?.driver)
                    return <ShiftDetailPage id={idNumber}/>;
            }}>

            </Route>
        </Router>
    );
}

export default App;
