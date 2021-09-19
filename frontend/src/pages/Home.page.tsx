import SlimTripWizard from "../components/SlimTripWizard.component";
import { Card } from "react-bootstrap";

export default function HomePage() {
    return (
        <div className="mx-4 h-75 row align-items-center">
            <div className="col">
                <Card className="p-4">
                    <SlimTripWizard />
                </Card>
            </div>
        </div>
    );
}
