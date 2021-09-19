import SlimTripWizard from "../components/SlimTripWizard.component";
import BackgroundImage from "../components/BackgroundImage";
import InfoSection from "../components/FirstInfoSection";
import SecondInfoSection from "../components/SecondInfoSection";

import { Card } from "react-bootstrap";

export default function HomePage() {
    return (
        <>
            <BackgroundImage />
            <div className="mx-4 h-75 row align-items-center">
                <div className="col">
                    <Card className="p-4">
                        <SlimTripWizard />
                    </Card>
                </div>
            </div>
            <InfoSection />
            <SecondInfoSection />
        </>
    );
}
