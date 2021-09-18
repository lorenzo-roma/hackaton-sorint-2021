import useInput from "../hooks/useInput.hook";
import {NOT_EMPTY_STRING} from "../utils/Validators";
import {Button, InputText} from "./system/InputText";
import InputDate from "./system/InputDate";
import ErrorComponent from "./Error.component";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const SlimTripWizard = () => {
    const [redirect, setRedirect] = useState(false);
    const fromInput = useInput('', [NOT_EMPTY_STRING.withPrintable('From cannot be empty')]);
    const toInput = useInput('', [NOT_EMPTY_STRING.withPrintable('To cannot be empty')]);

    const startCreationTrip = () => {
        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to={{pathname: '/', state: {initialFrom: fromInput.value, initialTo: toInput.value}}} />
    }

    return (
        <div>
            <label>From</label>
            <InputText {...fromInput} type="text" />
            <label>To</label>
            <InputText {...toInput} type="text" />
            <Button onClick={startCreationTrip} >Start trip</Button>
        </div>
    )
}

export default SlimTripWizard;