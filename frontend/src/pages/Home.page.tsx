import { useSelector } from "react-redux";
import { useAppSelector } from "../stores/store";
import SlimTripWizard from "../components/SlimTripWizard.component";
import React from "react";
import SelectAddress from "../components/SelectAddress.component";

export default function HomePage() {
    return (
        <div>
            <SlimTripWizard />
        </div>
    );
}
