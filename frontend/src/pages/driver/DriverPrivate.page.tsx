import {useShiftListMutation} from "../../services/shift.service";
import LoadingComponent from "../../components/Loading.component";
import ErrorComponent from "../../components/Error.component";
import {Button} from "../../components/system/InputText";
import {LinkContainer} from "react-router-bootstrap";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {NavLink} from "react-bootstrap";

const DriverPrivatePage = () => {
    const [doShiftList, {isLoading, isError, isSuccess, data: shifts}] = useShiftListMutation();
    const [redirectCreateShift, setRedirectCreateShift] = useState(false);

    useEffect(() => {
        doShiftList()
    }, []);

    if (redirectCreateShift) return <Redirect to="/driver/create-shift"/>
    if (isLoading) return <LoadingComponent/>
    if (isError || !shifts) return <ErrorComponent error="Error while retrieving shifts"/>;

    const createShift = () => {
        setRedirectCreateShift(true);
    }

    return (
        <>
            <h1>Shifts</h1>
            <Button onClick={createShift}>Create shift</Button>
            <br/>
            {
                shifts.map(shift => {
                    return (
                        <LinkContainer to={`/driver/shift/${shift.id}`} key={shift.id}>
                            <NavLink>
                                {shift.start} - {shift.end}
                            </NavLink>
                        </LinkContainer>
                    )
                })
            }
        </>
    );
}


export default DriverPrivatePage;