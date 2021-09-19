import SlimTripWizard from "../components/SlimTripWizard.component";
import HorizontalBar from "../components/HorizontalBar";
import InfoSection from "../components/FirstInfoSection";
import InfoCard from "../components/InfoCard";
import FeatureSection from "../components/FeatureSection";
import ComfortIcon from "../components/ComfortIcon";
import PeopleSafeIcon from "../components/PeopleSafeIcon";

import { Card } from "react-bootstrap";

export default function HomePage() {
    return (
        <>
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
                        <SlimTripWizard />
                    </Card>
                </div>
            </div>
            <div
                style={{ position: "relative" }}
                className="d-flex row justify-content-around"
            >
                <InfoCard
                    title="Be Secure"
                    description="All passenger are checked, just relax and enjoy your ride."
                    icon={<PeopleSafeIcon />}
                />
                <InfoCard
                    title="Comfort"
                    description="We will pick you up from your home and we will bring you to your destination"
                    icon={<ComfortIcon />}
                />
                <HorizontalBar
                    style={{
                        position: "absolute",
                        "z-index": "-1",
                        bottom: "-25%",
                    }}
                />
            </div>
            <FeatureSection />
        </>
    );
}
