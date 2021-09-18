import {useEffect} from "react";
import useInput from "../hooks/useInput.hook";
import {GREATER_THAN, NOT_EMPTY, NOT_EMPTY_STRING} from "../utils/Validators";
import {Button, InputText} from "./system/InputText";
import DatePicker from "react-datepicker";
import InputDateTime from "./system/InputDateTime";
import ToBeScheduledTrip, {ToBeScheduledTripApiInterface} from "../classes/ToBeScheduledTrip.class";
import {useSignupMutation} from "../services/auth.service";
import {useCreateTripMutation} from "../services/trip.service";
import LoadingComponent from "./Loading.component";
import ErrorComponent from "./Error.component";
import moment from "moment";

export interface TripWizardProps {
    initialFrom?: string;
    initialTo?: string;
}

const TripWizard = ({initialFrom, initialTo}: TripWizardProps) => {
    const [doCreateTrip, { isLoading, isError }] = useCreateTripMutation();
    const fromInput = useInput(initialFrom || "", [NOT_EMPTY_STRING.withPrintable('From cannot be empty')]);
    const toInput = useInput(initialTo || "", [NOT_EMPTY_STRING.withPrintable('To cannot be empty')]);
    const initialAvailability = useInput<Date>(moment(new Date()).add(24, "hours").toDate(), [
        NOT_EMPTY.withPrintable('Date cannot be empty'),
        GREATER_THAN(moment(new Date()).add(23, "hours").toDate()).withPrintable("Date cannot be in the past")
    ]);
    const endAvailability = useInput<Date>(moment(new Date()).add(24, "hours").add(30, "m").toDate(), [
        NOT_EMPTY.withPrintable('Date cannot be empty'),
        GREATER_THAN(initialAvailability.value).withPrintable("End availability must be greater than the start")
    ]);
    const endDateTime = useInput<Date>(moment(endAvailability.value).add(1, "hours").toDate(), [
        NOT_EMPTY.withPrintable('Date cannot be empty'),
        GREATER_THAN(initialAvailability.value).withPrintable("Arrival date must be greater than the initial availability")
    ]);


    const createTrip = () => {
        const tripToBeSchedule: ToBeScheduledTripApiInterface = {
            from: fromInput.value,
            to: toInput.value,
            initialAvailability: initialAvailability.value,
            endAvailability: endAvailability.value,
            arrival: endDateTime.value,
        };
        console.log("tripToBeSchedule",tripToBeSchedule,)
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
            <InputDateTime {...initialAvailability} minDate={new Date()} />
            <label>End availability date</label>
            <InputDateTime {...endAvailability} minDate={initialAvailability.value} />
            <label>Arrival Date</label>
            <InputDateTime {...endDateTime} minDate={initialAvailability.value} />
            {isError && (
                <ErrorComponent error="Error during creation" />
            )}
            <Button onClick={createTrip} >Create trip</Button>
        </div>
    )
};

export default TripWizard;