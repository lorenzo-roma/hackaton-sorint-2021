import {useCalculateShiftMutation, useRetrieveShiftMutation} from "../../../services/shift.service";
import LoadingComponent from "../../../components/Loading.component";
import ErrorComponent from "../../../components/Error.component";
import moment from "moment";
import {useEffect} from "react";
import {HopType} from "../../../classes/Checkpoint.class";
import {Button} from "../../../components/system/InputText";

type ShiftDetailPageProps = {
    id: number;
}

const ShiftDetailPage = (props: ShiftDetailPageProps) => {
    const [doShiftRetrieve, {
        isLoading: isRetrieveLoading,
        isError: isRetrieveError,
        data: shift
    }] = useRetrieveShiftMutation();
    const [doCalculateShift, {isLoading: isCalculateLoading, isError: isCalculateError}] = useCalculateShiftMutation();
    useEffect(() => {
        doShiftRetrieve(props.id);
    }, [doShiftRetrieve, props.id]);
    if (isRetrieveLoading) return <LoadingComponent/>
    if (isRetrieveError || !shift) return <ErrorComponent error="Error retrieving shift detail"/>

    function startCalculateShift() {
        doCalculateShift(props.id).unwrap().then(() => doShiftRetrieve(props.id));
    }

    return (
        <div>
            <h1>{moment(shift.start).format("dddd MMMM")}</h1>
            <p>{moment(shift.start).format("HH:mm")} - {moment(shift.end).format("HH:mm")}</p>
            {shift.checkpoints.length > 0 && (
                <>
                    <div style={{height: "60vh", width: "100%", backgroundColor: "lightgrey"}}>

                    </div>
                    {
                        shift.checkpoints.map(checkpoint => (
                            <div>
                                {checkpoint.user.name} {checkpoint.user.surname}
                                {checkpoint.position}
                                {checkpoint.hopType === HopType.PICKUP && "Pickup"}
                                {checkpoint.hopType === HopType.DROPOUT && "Dropout"}
                                <a href={`tel:${checkpoint.user.phoneNumber}`}>Call</a>
                            </div>
                        ))
                    }
                </>
            )}
            {shift.checkpoints.length === 0 && (
                <>
                    {!isCalculateLoading && <Button onClick={startCalculateShift}>Calculate Path</Button>}
                    {isCalculateLoading && <LoadingComponent/>}
                    {isRetrieveError && <ErrorComponent error="Error while calculating path" />}
                </>
            )}
        </div>
    );

}
;

export default ShiftDetailPage;