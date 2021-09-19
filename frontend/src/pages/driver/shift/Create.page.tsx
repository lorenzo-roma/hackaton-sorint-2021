import useInput from "../../../hooks/useInput.hook";
import {
    GREATER_THAN,
    LOWER_THAN,
    NOT_EMPTY,
    NOT_EMPTY_STRING,
    NUMBER,
    Validator,
} from "../../../utils/Validators";
import moment from "moment";
import {Button, InputText} from "../../../components/system/InputText";
import InputDateTime from "../../../components/system/InputDateTime";
import {useCreateShiftMutation} from "../../../services/shift.service";
import LoadingComponent from "../../../components/Loading.component";
import ErrorComponent from "../../../components/Error.component";
import {Redirect} from "react-router-dom";
import {geocodeByPlaceId, getLatLng} from "react-google-places-autocomplete";
import AutoCompleteResponse from "../../../classes/autocomplete-response.class";
import SelectAddress from "../../../components/SelectAddress.component";
import {Container, Form, FormGroup} from "react-bootstrap";
import Card from "../../../components/Card.component";

const CreateShiftPage = (props: any) => {
    const [doCreateShift, {isLoading, isError, isSuccess}] =
        useCreateShiftMutation();
    const startDefaultDate = moment(new Date()).add(25, "h").toDate();
    const endDefaultDate = moment(startDefaultDate).add(4, "h").toDate();
    const startInput = useInput(startDefaultDate, [
        GREATER_THAN(moment(new Date()).add(24, "h").toDate()).withPrintable(
            "You cannot plan a shift 24 hours before"
        ),
    ]);
    const endInput = useInput(endDefaultDate, [
        GREATER_THAN(startInput.value).withPrintable(
            "End shift date should be greater than the start"
        ),
    ]);
    const startingPositionInput = useInput<AutoCompleteResponse | undefined>(
        undefined
    );
    const capacityInput = useInput<string>("5", [
        NOT_EMPTY.withPrintable("Capacity should not be empty"),
        NUMBER,
        GREATER_THAN(4).withPrintable("Capacity should be greater than 4"),
        LOWER_THAN(10).withPrintable("Capacity should be lower than 10"),
    ]);

    if (isLoading) return <LoadingComponent/>;
    if (isError) return <ErrorComponent error="Cannot create shift"/>;
    if (isSuccess) return <Redirect to="/driver"/>;

    function shiftFormHasError() {
        return (
            startInput.hasErrors ||
            endInput.hasErrors ||
            capacityInput.hasErrors ||
            startingPositionInput.hasErrors
        );
    }

    async function createShift() {
        if (shiftFormHasError()) return;
        const geoCodeFrom = await geocodeByPlaceId(
            startingPositionInput.value!.value.place_id
        );
        const point = await getLatLng(geoCodeFrom[0]);

        doCreateShift({
            end: endInput.value,
            start: startInput.value,
            capacity: Number(capacityInput.value),
            startingPositionName: startingPositionInput.value!.label,
            startingPositionLat: point.lat,
            startingPositionLng: point.lng,
        });
    }


    return (
        <Container>
            <div className="float-end">
                <Button onClick={() => window.history.back()} className="m-2">CANCEL</Button>
                <Button onClick={createShift} className="m-2">SAVE</Button>
            </div>
            <h1 className="header1">
                Create Shift
            </h1>
            <p className="body1">Tell us when you are available for trips</p>
            <Card>
                <Form.Group className="my-2" style={{maxWidth: "300px"}}>
                    <Form.Label className="caption">Starting from:</Form.Label>
                    <SelectAddress {...startingPositionInput} />
                </Form.Group>
                <Form.Group className="my-2" style={{maxWidth: "300px"}}>
                    <Form.Label className="caption">Starting date:</Form.Label>
                    <InputDateTime {...startInput} />
                </Form.Group>
                <Form.Group className="my-2" style={{maxWidth: "300px"}}>
                    <Form.Label className="caption">End date:</Form.Label>
                    <InputDateTime {...endInput} />
                </Form.Group>
                <Form.Group className="my-2" style={{maxWidth: "300px"}}>
                    <Form.Label className="caption">Capacity of the vehicle for passengers:</Form.Label>
                    <InputText type={"number"} {...capacityInput} />
                </Form.Group>
            </Card>
        </Container>
    );
};
export default CreateShiftPage;
