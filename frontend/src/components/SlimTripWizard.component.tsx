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
    const fromInput = useInput<AutoCompleteResponse>(
        {} as AutoCompleteResponse
    );
    const toInput = useInput("", [
        NOT_EMPTY_STRING.withPrintable("To cannot be empty"),
    ]);

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
        <div>
            <label>From</label>
            <SelectAddress {...fromInput} />
            <label>To</label>
            <InputText {...toInput} type="text" />
            <Button onClick={startCreationTrip}>Start trip</Button>
        </div>
    );
};

export default SlimTripWizard;
