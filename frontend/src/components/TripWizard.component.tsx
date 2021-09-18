import {useEffect} from "react";
import useInput from "../hooks/useInput.hook";
import {NOT_EMPTY, NOT_EMPTY_STRING} from "../utils/Validators";
import {Button, InputText} from "./system/InputText";
import DatePicker from "react-datepicker";
import InputDate from "./system/InputDate";
import ToBeScheduledTrip, {ToBeScheduledTripInterface} from "../classes/ToBeScheduledTrip.class";
import {useSignupMutation} from "../services/auth.service";
import {useCreateTripMutation} from "../services/trip.service";
import LoadingComponent from "./Loading.component";
import ErrorComponent from "./Error.component";

export interface TripWizardProps {
    initialFrom?: string;
    initialTo?: string;
}

const TripWizard = ({initialFrom, initialTo}: TripWizardProps) => {
    const [doCreateTrip, { isLoading, isError }] = useCreateTripMutation();
    const fromInput = useInput(initialFrom || '', [NOT_EMPTY_STRING.withPrintable('From cannot be empty')]);
    const toInput = useInput(initialTo || '', [NOT_EMPTY_STRING.withPrintable('To cannot be empty')]);
    const initialAvailability = useInput<Date>(new Date(), [NOT_EMPTY.withPrintable('Date cannot be empty')]);
    const endAvailability = useInput<Date>(new Date(), [NOT_EMPTY.withPrintable('Date cannot be empty')]);
    const endDateTime = useInput<Date>(new Date(), [NOT_EMPTY.withPrintable('Date cannot be empty')]);


    const createTrip = () => {
        const tripToBeSchedule: ToBeScheduledTripInterface = {
            from: fromInput.value,
            to: toInput.value,
            initialAvailability: initialAvailability.value,
            endAvailability: endAvailability.value,
            arrival: endDateTime.value,
        };
        doCreateTrip(tripToBeSchedule);
    };
    if(isLoading) return <LoadingComponent />;
    return (
        <div>
            <label>From</label>
            <InputText {...fromInput} type="text" />
            <label>To</label>
            <InputText {...toInput} type="text" />
            <label>Start availability date</label>
            <InputDate {...initialAvailability} />
            <label>End availability date</label>
            <InputDate {...endAvailability} />
            <label>Arrival Date</label>
            <InputDate {...endDateTime} />
            {isError && (
                <ErrorComponent error="Error during creation" />
            )}
            <Button onClick={createTrip} />
        </div>
    )
};

export default TripWizard;