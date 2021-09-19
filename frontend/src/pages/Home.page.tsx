import SlimTripWizard from "../components/SlimTripWizard.component";
import HorizontalBar from "../components/HorizontalBar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import FeatureSection from "../components/FeatureSection";
import ComfortIcon from "../components/ComfortIcon";
import PeopleSafeIcon from "../components/PeopleSafeIcon";

import {Card, Col, Container, Row} from "react-bootstrap";

export default function HomePage() {
    return (
        <>
            <div className="row mb-2" style={{minHeight: "60vh"}}>
                <div className="h-100 col-12 col-md-6 header1 ">
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
                <div className="h-100 col-12 col-md-6 flex-column my-4 d-flex justify-content-center">
                    <Card className="p-4 w-75 bg-primary-light  align-self-center">
                        <SlimTripWizard/>
                    </Card>
                </div>
            </div>

            <HorizontalBar
                style={{
                    marginTop: '50px'
                }}
            >
                <Container>
                    <Row
                        style={{position: "relative", top: '-50px'}}
                        className="d-flex row justify-content-around"
                    >
                        <Col>
                            <InfoCard
                                title="Be Secure"
                                description="All passenger are checked, just relax and enjoy your ride."
                                icon={<PeopleSafeIcon/>}
                            />
                        </Col>
                        <Col className="flex-grow-1 d-none d-md-block">
                        </Col>
                        <Col>
                            <InfoCard
                                title="Comfort"
                                description="We will pick you up from your home and we will bring you to your destination"
                                icon={<ComfortIcon/>}
                            />
                        </Col>
                    </Row>
                </Container>
            </HorizontalBar>
            <FeatureSection/>
        </>
    );
}
