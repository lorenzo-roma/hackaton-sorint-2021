import {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useAppDispatch, useAppSelector} from "../stores/store";
import {AuthState, clearToken, selectAuthState} from "../stores/auth.store";
import {useCookies} from "react-cookie";
import {Button} from "./system/InputText";

type NavbarComponentProps = {
    driver: boolean;
};
const NavbarComponent = (props: NavbarComponentProps) => {
    const authState = useAppSelector(selectAuthState);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const dispatch = useAppDispatch();

    const loggedOutSection = function () {
        return (
            <Nav>
                <Nav.Item>
                    <LinkContainer
                        to={props.driver ? "/driver/login" : "/login"}
                    >
                        <Button className="btn btn-transparent mx-2">Login</Button>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer
                        to={props.driver ? "/driver/signup" : "/signup"}
                    >
                        <Button className="btn btn-primary mx-2">Signup</Button>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    };

    const loggedInDriverSection = function () {
        return (
            <Nav>
                <Nav.Item>
                    <LinkContainer
                        to={"/driver"}
                    >
                        <Button className="btn btn-primary mx-2">MY SHIFTS</Button>
                    </LinkContainer>
                </Nav.Item>
                {logoutButton()}
            </Nav>
        );
    };

    function logoutButton() {
        const clearTokenCookie = () => {
            dispatch(clearToken({}));
            removeCookie("token");
        };
        return <Nav.Item>
            <Button className="btn btn-transparent mx-2" onClick={() => clearTokenCookie()}>
                LOGOUT
            </Button>
        </Nav.Item>;
    }

    const loggedInUserSection = function () {
        return (
            <Nav>
                {scheduleTrips()}
                {logoutButton()}
            </Nav>
        );
    };

    function driverSection() {
        return (
            <Nav className="mg-xl-l">
                <Nav.Item>
                    <LinkContainer to="/driver">
                        <Nav.Link>Become a driver</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    }

    function goToUserSection() {
        return (
            <Nav className="mg-xl-l">
                <Nav.Item>
                    <LinkContainer to="/">
                        <Nav.Link>Schedule a trip</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    }

    function myTrips() {
        return (
            <Nav className="mg-xl-l">
                <Nav.Item>
                    <LinkContainer to="/">
                        <Nav.Link>My Trips</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    }

    function scheduleTrips() {
        return (
            <Nav className="mg-xl-l">
                <Nav.Item>
                    <LinkContainer
                        to={"/driver"}
                    >
                        <Button className="btn btn-primary mx-2">SCHEDULE TRIP</Button>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        );
    }

    return (
        <Navbar className="mb-4">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand className=""><span className="header1">Hop.io</span>{props.driver &&
                    <sub className="caption">Driver</sub>}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse className="button-font d-flex align-items-center">
                    {!props.driver && authState == AuthState.LOGGED_OUT && driverSection()}
                    {!props.driver && authState == AuthState.LOGGED_IN && myTrips()}
                    {props.driver && goToUserSection()}
                    <Nav className="me-auto"/>
                    {authState == AuthState.LOGGED_OUT && loggedOutSection()}
                    {authState == AuthState.LOGGED_IN && props.driver && loggedInDriverSection()}
                    {authState == AuthState.LOGGED_IN && !props.driver && loggedInUserSection()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
