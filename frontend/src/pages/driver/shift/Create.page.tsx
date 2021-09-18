import useInput from "../../../hooks/useInput.hook";
import {GREATER_THAN, LOWER_THAN, NOT_EMPTY, NOT_EMPTY_STRING, NUMBER, Validator} from "../../../utils/Validators";
import moment from "moment";
import {Button, InputText} from "../../../components/system/InputText";
import InputDateTime from "../../../components/system/InputDateTime";
import {useCreateShiftMutation} from "../../../services/shift.service";
import LoadingComponent from "../../../components/Loading.component";
import ErrorComponent from "../../../components/Error.component";
import {Redirect} from "react-router-dom";

const CreateShiftPage = () => {
    const [doCreateShift, {isLoading, isError, isSuccess}] = useCreateShiftMutation();
    const startDefaultDate = moment(new Date()).add(25, "h").toDate()
    const endDefaultDate = moment(startDefaultDate).add(4, "h").toDate()
    const startInput = useInput(startDefaultDate, [GREATER_THAN(moment(new Date()).add(24, "h").toDate()).withPrintable("You cannot plan a shift 24 hours before")]);
    const endInput = useInput(endDefaultDate, [GREATER_THAN(startInput.value).withPrintable("End shift date should be greater than the start")]);
    const startingPositionInput = useInput("", [NOT_EMPTY_STRING.withPrintable("Starting position should not be empty")]);
    const capacityInput = useInput<string>("5", [
        NOT_EMPTY.withPrintable("Capacity should not be empty"),
        NUMBER,
        GREATER_THAN(4).withPrintable("Capacity should be greater than 4"),
        LOWER_THAN(10).withPrintable("Capacity should be lower than 10"),
    ]);

    if(isLoading) return <LoadingComponent />;
    if(isError) return <ErrorComponent error="Cannot create shift"/>;
    if(isSuccess) return <Redirect to="/driver" />;

    function shiftFormHasError() {
        return startInput.hasErrors || endInput.hasErrors || capacityInput.hasErrors || startingPositionInput.hasErrors;
    }

    function createShift() {
        if(shiftFormHasError()) return;
        doCreateShift({
            end: endInput.value,
            start: startInput.value,
            capacity: Number(capacityInput.value),
            startingPosition: startingPositionInput.value
        })
    }

    return (
        <div>
            <label>Starting date:</label>
            <InputDateTime {...startInput} />
            <label>Ending date:</label>
            <InputDateTime {...endInput} />
            <label>Capacity of the vehicle for passengers:</label>
            <InputText type={"number"} {...capacityInput} />
            <label>Starting position of the shift:</label>
            <InputText type={"text"} {...startingPositionInput} />
            <Button onClick={createShift} >Create shift</Button>
        </div>
    )
};
export default CreateShiftPage;