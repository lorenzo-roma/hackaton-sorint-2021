import { Button } from "../../components/system/InputText";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import img from "../../assets/driver.jpg";

const DriverPublicPage = () => {
    const [redirect, setRedirect] = useState(false);
    if (redirect) return <Redirect to="/driver/signup" />;
    return (
        <Container className=" h-100 w-100">
            <Row className="vh-100">
                <Col xs="12" md="6">
                    <div style={{ marginTop: "30vh" }}>
                        <h1 className="header1">Create a Business</h1>
                        <p className="body1">
                            You only need a van and schedule some shifts
                        </p>
                        <Button onClick={() => setRedirect(true)}>
                            JOIN US
                        </Button>
                    </div>
                </Col>
                <Col
                    xs="12"
                    md="6"
                    className="bg-primary align-self-center"
                    style={{
                        height: "60vh",
                        backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                    }}
                ></Col>
            </Row>
        </Container>
    );
};
export default DriverPublicPage;
