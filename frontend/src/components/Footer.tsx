import HorizontalBar from "./HorizontalBar";

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
                        <div className="button-font mb-2">Home</div>
                        <div className="button-font">Become a driver</div>
                    </div>
                    <div>
                        <div className="button-font mb-2">Login</div>
                        <div className="button-font">Signup</div>
                    </div>
                </div>
            </div>
        </HorizontalBar>
    );
};

export default Footer;
