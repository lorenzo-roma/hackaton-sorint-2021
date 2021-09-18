import {useSelector} from "react-redux";
import {useAppSelector} from "../stores/store";
import SlimTripWizard from "../components/SlimTripWizard.component";

export default function HomePage() {
    return (<div>
        <SlimTripWizard />
    </div>);
}
