import useInput from "../hooks/useInput.hook";
import { NOT_EMPTY_STRING } from "../utils/Validators";
import { Button, InputText } from "./system/InputText";
import InputDateTime from "./system/InputDateTime";
import ErrorComponent from "./Error.component";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SelectAddress from "./SelectAddress.component";
import AutoCompleteResponse from "../classes/autocomplete-response.class";

const SlimTripWizard = () => {
    const [redirect, setRedirect] = useState(false);
    const fromInput = useInput<AutoCompleteResponse | undefined>(undefined);
    const toInput = useInput<AutoCompleteResponse | undefined>(undefined);

    const startCreationTrip = () => {
        setRedirect(true);
    };

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: {
                        initialFrom: fromInput.value,
                        initialTo: toInput.value,
                    },
                }}
            />
        );
    }

    return (
        <div className="sanserif">
            <label className="serif black fs-6 mb-1">From</label>
            <SelectAddress {...fromInput} />
            <label className="serif black fs-6 mt-3 mb-1">To</label>
            <SelectAddress {...toInput} />
            <div className="mt-4 fs-6">
                <Button onClick={startCreationTrip}>Start trip</Button>
            </div>
        </div>
    );
};

export default SlimTripWizard;
