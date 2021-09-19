import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { AuthState, clearToken, selectAuthState } from "../stores/auth.store";
import { useCookies } from "react-cookie";
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

    const loggedInSection = function () {
        const clearTokenCookie = () => {
            dispatch(clearToken({}));
            removeCookie("token");
        };
        return (
            <Nav>
                <Nav.Item>
                    <Nav.Link onClick={(_) => clearTokenCookie()}>
                        Logout
                    </Nav.Link>
                </Nav.Item>
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

    return (
        <Navbar>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand className=""><span className="header1">Hop.io</span>{props.driver && <sub className="caption">Driver</sub> }</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse className="button-font ">
                    {!props.driver && driverSection()}
                    <Nav className="me-auto" />
                    {authState == AuthState.LOGGED_OUT && loggedOutSection()}
                    {authState == AuthState.LOGGED_IN && loggedInSection()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
