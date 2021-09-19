import HorizontalBar from "./HorizontalBar";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
    return (
        <HorizontalBar>
            <div
                className="d-flex flex-column footer"
                style={{ padding: "32px 10vw" }}
            >
                <div className="header2">Hop.io</div>

                <div className="d-flex flex-direction-row justify-content-between">
                    <div>
                        <div className="body1 mb-3">Hop in, hop off</div>
                        <div className="small-font">Davide Campagnola</div>
                        <div className="small-font">Lorenzo Romagnoni</div>
                    </div>
                    <div>
                        <LinkContainer to="/">
                            <div className="button-font mb-2">Home</div>
                        </LinkContainer>
                        <LinkContainer to="/driver">
                            <div className="button-font">Become a driver</div>
                        </LinkContainer>
                    </div>
                    <div>
                        <LinkContainer to="/login">
                            <div className="button-font mb-2">Login</div>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <div className="button-font">Signup</div>
                        </LinkContainer>
                    </div>
                </div>
            </div>
        </HorizontalBar>
    );
};

export default Footer;
