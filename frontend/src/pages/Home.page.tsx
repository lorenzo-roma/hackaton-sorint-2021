import SlimTripWizard from "../components/SlimTripWizard.component";
import React, {useEffect, useState} from "react";
import {GoogleMap, DirectionsRenderer, DirectionsService, useJsApiLoader} from "@react-google-maps/api";


export default function HomePage() {
    return (
        <div>
            <SlimTripWizard/>
        </div>
    );
}
