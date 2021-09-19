import SlimTripWizard from "../components/SlimTripWizard.component";
import RoadIcon from "../components/RoadIcon";
import InfoSection from "../components/FirstInfoSection";
import SecondInfoSection from "../components/SecondInfoSection";

import { Card } from "react-bootstrap";

export default function HomePage() {
    return (
        <>
            <div className="row h-100">
                <div className="h-75 col-6 header1 ">
                    <div className="w-75 h-75 d-flex justify-content-center mx-auto">
                        <div className="h-50">
                            Hop In,<br></br>
                            Hop off<br></br>
                            <div className="body2">
                                Rethink your way to travel daily
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-75 col-6 flex-column d-flex justify-content-center">
                    <Card className="p-4 w-75 bg-primary-light">
                        <SlimTripWizard />
                    </Card>
                </div>
            </div>

            <InfoSection />
            <SecondInfoSection />
        </>
    );
}
