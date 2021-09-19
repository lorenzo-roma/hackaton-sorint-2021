import {useShiftListMutation} from "../../services/shift.service";
import LoadingComponent from "../../components/Loading.component";
import ErrorComponent from "../../components/Error.component";
import {Button} from "../../components/system/InputText";
import {LinkContainer} from "react-router-bootstrap";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {Col, Container, NavLink, Row} from "react-bootstrap";
import Card from "../../components/Card.component";
import DateFormat from "../../utils/DateFormat";

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
        <Container>
            <br/>
            <Button className="float-end" onClick={createShift}>ADD SHIFT</Button>
            <h1 className="header1">My Shifts</h1>
            <p className="body1">These are the periods when you are available</p>
            <br/>
            <Row>
                {
                    shifts.map(shift => {
                        return (

                            <Col xs={6} md={4} key={shift.id}>
                                <LinkContainer to={`/driver/shift/${shift.id}`} className="pointer-event">
                                    <a className="link-unstyled">
                                        <Card>
                                            <div
                                                className="caption">{DateFormat.toShortDateAndTime(shift.start)} - {DateFormat.toShortDateAndTime(shift.end)}</div>
                                            <h2 className="header2">{shift.startingPositionName}</h2>
                                            <div className="body2">Capacity: {shift.capacity}</div>
                                            <p className="caption text-center mt-4">SHOW MORE</p>
                                        </Card>
                                    </a>
                                </LinkContainer>
                            </Col>

                        )
                    })
                }
            </Row>
        </Container>
    );
}


export default DriverPrivatePage;