import { useTripListMutation } from "../services/trip.service";
import React, { useEffect } from "react";
import LoadingComponent from "../components/Loading.component";
import ConfirmedTrip from "../classes/ConfirmedTrip.class";
import ErrorComponent from "../components/Error.component";
import { useSelector } from "react-redux";
import { useAppSelector } from "../stores/store";
import TripWizard, {
    TripWizardProps,
} from "../components/TripWizard.component";
import SelectAddress from "../components/SelectAddress.component";
import AutoCompleteResponse from "../classes/autocomplete-response.class";
import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import DateFormat from "../utils/DateFormat";
import { HopType } from "../classes/Checkpoint.class";
import PhoneIcon from "../components/PhoneIcon";
import DirectionsIcon from "../components/DirectionsIcon";
import ArrowIcon from "../components/ArrowIcon";

type HomePagePrivateProps = {
    initialFrom?: AutoCompleteResponse;
    initialTo?: AutoCompleteResponse;
};

const HomePagePrivate = (props: HomePagePrivateProps) => {
    const [doTrips, { isLoading, isError, data: tripsResponse, isSuccess }] =
        useTripListMutation();
    useEffect(() => {
        doTrips();
    }, [doTrips]);
    if (isLoading) return <LoadingComponent />;
    return (
        <Container>
            <TripWizard
                initialFrom={props.initialFrom}
                initialTo={props.initialTo}
                onAddedTrip={doTrips}
            />
            <br />
            {isError && <ErrorComponent error={"Error while loading trips"} />}
            {isSuccess && (
                <>
                    {tripsResponse && tripsResponse.confirmedTrips.length > 0 && (
                        <>
                            <h1 className="header2">Upcoming Trips</h1>
                            <p className="body1">
                                Here are your scheduled trips
                            </p>
                            {tripsResponse.confirmedTrips.map((trip) => (
                                <div key={trip.id}>
                                    <hr />
                                    <Row
                                        key={trip.id}
                                        className="align-items-center"
                                    >
                                        <Col xs="auto" className="text-center">
                                            <div className="header3">
                                                {" "}
                                                {moment(
                                                    trip.confirmedPickup
                                                ).format("HH:mm")}
                                            </div>
                                            <div className="caption">
                                                {DateFormat.toShortDay(
                                                    trip.confirmedPickup
                                                )}{" "}
                                                {DateFormat.toShortMonth(
                                                    trip.confirmedPickup
                                                )}
                                            </div>
                                        </Col>
                                        <Col className="body1 text-center">
                                            {trip.fromName}
                                        </Col>
                                        <Col className="text-center">
                                            <ArrowIcon />
                                        </Col>
                                        <Col className="body1 text-center">
                                            {trip.toName}
                                        </Col>
                                        <Col xs="auto" className="text-center">
                                            <div className="header3">
                                                {" "}
                                                {moment(trip.arrival).format(
                                                    "HH:mm"
                                                )}
                                            </div>
                                            <div className="caption">
                                                {DateFormat.toShortDay(
                                                    trip.arrival
                                                )}{" "}
                                                {DateFormat.toShortMonth(
                                                    trip.arrival
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </>
                    )}

                    {tripsResponse &&
                        tripsResponse.toBeScheduledTrips.length > 0 && (
                            <>
                                <h1 className="header2">
                                    To Be Scheduled Trip
                                </h1>
                                <p className="body1">
                                    Here are your trips that need to be
                                    scheduled
                                </p>
                                {tripsResponse.toBeScheduledTrips.map(
                                    (trip) => (
                                        <div key={trip.id}>
                                            <hr />
                                            <Row
                                                key={trip.id}
                                                className="align-items-center"
                                            >
                                                <Col
                                                    xs="auto"
                                                    className="text-center"
                                                >
                                                    <div className="header3">
                                                        {" "}
                                                        {moment(
                                                            trip.initialAvailability
                                                        ).format("HH:mm")}{" "}
                                                        -{" "}
                                                        {moment(
                                                            trip.endAvailability
                                                        ).format("HH:mm")}
                                                    </div>
                                                    <div className="caption">
                                                        {DateFormat.toShortDay(
                                                            trip.initialAvailability
                                                        )}{" "}
                                                        {DateFormat.toShortMonth(
                                                            trip.initialAvailability
                                                        )}
                                                    </div>
                                                </Col>
                                                <Col className="body1 text-center">
                                                    {trip.fromName}
                                                </Col>
                                                <Col className="text-center">
                                                    <ArrowIcon />
                                                </Col>
                                                <Col className="body1 text-center">
                                                    {trip.toName}
                                                </Col>
                                                <Col
                                                    xs="auto"
                                                    className="text-center"
                                                >
                                                    <div className="header3">
                                                        {" "}
                                                        {moment(
                                                            trip.arrival
                                                        ).format("HH:mm")}
                                                    </div>
                                                    <div className="caption">
                                                        {DateFormat.toShortDay(
                                                            trip.arrival
                                                        )}{" "}
                                                        {DateFormat.toShortMonth(
                                                            trip.arrival
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                )}
                            </>
                        )}
                </>
            )}
        </Container>
    );
};

export default HomePagePrivate;
