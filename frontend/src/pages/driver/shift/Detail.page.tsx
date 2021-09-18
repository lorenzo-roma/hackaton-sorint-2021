import {useRetrieveShiftMutation} from "../../../services/shift.service";
import LoadingComponent from "../../../components/Loading.component";
import ErrorComponent from "../../../components/Error.component";
import moment from "moment";
import { useParams } from "react-router-dom";
import {useEffect} from "react";

type ShiftDetailPageProps = {
    id: number;
}

const ShiftDetailPage = (props: ShiftDetailPageProps) => {
    const [doShiftRetrieve, {isLoading, isError, data: shift}] = useRetrieveShiftMutation();
    useEffect(() => {
        doShiftRetrieve(props.id);
    }, [doShiftRetrieve, props.id])
    if(isLoading) return <LoadingComponent />
    if(isError || !shift) return <ErrorComponent error="Error retrieving shift detail" />
    return (
        <div>
            <h1>{moment(shift.start).format("dddd MMMM")}</h1>
            <p>{moment(shift.start).format("HH:mm")} - {moment(shift.end).format("HH:mm")}</p>
            <div style={{height: "60vh", width: "100%", backgroundColor: "lightgrey"}}>

            </div>
            {
                shift.checkpoints.map(checkpoint => (
                    <div>
                        {checkpoint.user.name} {checkpoint.user.surname}
                        {checkpoint.position}
                        {checkpoint.pickup && "Hop in"}
                        {!checkpoint.pickup && "Hop off"}
                        <a href={`tel:${checkpoint.user.phoneNumber}`}>Call</a>
                    </div>
                ))
            }
        </div>
    );

};

export default ShiftDetailPage;