import useInput from "../hooks/useInput.hook";
import { GREATER_THAN, NOT_EMPTY, NOT_EMPTY_STRING } from "../utils/Validators";
import { Button } from "./system/InputText";
import InputDateTime from "./system/InputDateTime";
import ToBeScheduledTrip, {
    ToBeScheduledTripApiInterface,
} from "../classes/ToBeScheduledTrip.class";
import { useCreateTripMutation } from "../services/trip.service";
import LoadingComponent from "./Loading.component";
import ErrorComponent from "./Error.component";
import moment from "moment";
import AutoCompleteResponse from "../classes/autocomplete-response.class";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";
import SelectAddress from "./SelectAddress.component";

export interface TripWizardProps {
    initialFrom?: AutoCompleteResponse;
    initialTo?: AutoCompleteResponse;
    onAddedTrip: () => void;
}

const TripWizard = ({
    initialFrom,
    initialTo,
    onAddedTrip,
}: TripWizardProps) => {
    const [doCreateTrip, { isLoading, isError }] = useCreateTripMutation();
    const fromInput = useInput<AutoCompleteResponse | undefined>(initialFrom, [
        NOT_EMPTY,
    ]);
    const toInput = useInput<AutoCompleteResponse | undefined>(initialTo, [
        NOT_EMPTY,
    ]);
    const initialAvailability = useInput<Date>(
        moment(new Date()).add(24, "hours").toDate(),
        [
            NOT_EMPTY.withPrintable("Date cannot be empty"),
            GREATER_THAN(
                moment(new Date()).add(23, "hours").toDate()
            ).withPrintable("Date cannot be in the past"),
        ]
    );
    const endAvailability = useInput<Date>(
        moment(new Date()).add(24, "hours").add(30, "m").toDate(),
        [
            NOT_EMPTY.withPrintable("Date cannot be empty"),
            GREATER_THAN(initialAvailability.value).withPrintable(
                "End availability must be greater than the start"
            ),
        ]
    );
    const endDateTime = useInput<Date>(
        moment(endAvailability.value).add(1, "hours").toDate(),
        [
            NOT_EMPTY.withPrintable("Date cannot be empty"),
            GREATER_THAN(initialAvailability.value).withPrintable(
                "Arrival date must be greater than the initial availability"
            ),
        ]
    );

    const isInputValid = () =>
        !(
            fromInput.hasErrors ||
            toInput.hasErrors ||
            initialAvailability.hasErrors ||
            endAvailability.hasErrors ||
            endDateTime.hasErrors
        );

    const createTrip = async () => {
        if (!isInputValid()) return;
        const geoCodeFrom = await geocodeByPlaceId(
            fromInput.value!.value.place_id
        );
        const geoCodeTo = await geocodeByPlaceId(toInput.value!.value.place_id);
        const fromPoint = await getLatLng(geoCodeFrom[0]);
        const toPoint = await getLatLng(geoCodeTo[0]);

        const tripToBeSchedule: ToBeScheduledTripApiInterface = {
            fromName: fromInput.value!.label,
            toName: toInput.value!.label,
            fromLat: fromPoint.lat,
            fromLng: fromPoint.lng,
            toLat: toPoint.lat,
            toLng: toPoint.lng,
            initialAvailability: initialAvailability.value,
            endAvailability: endAvailability.value,
            arrival: endDateTime.value,
        };
        doCreateTrip(tripToBeSchedule).unwrap().then(onAddedTrip);
    };
    if (isLoading) return <LoadingComponent />;
    return (
        <div>
            <label>From</label>
            <SelectAddress {...fromInput} />
            <label>To</label>
            <SelectAddress {...toInput} />
            <label>Start availability date</label>
            <InputDateTime {...initialAvailability} minDate={new Date()} />
            <label>End availability date</label>
            <InputDateTime
                {...endAvailability}
                minDate={initialAvailability.value}
            />
            <label>Arrival Date</label>
            <InputDateTime
                {...endDateTime}
                minDate={initialAvailability.value}
            />
            {isError && <ErrorComponent error="Error during creation" />}
            <Button onClick={createTrip}>Create trip</Button>
        </div>
    );
};

export default TripWizard;
