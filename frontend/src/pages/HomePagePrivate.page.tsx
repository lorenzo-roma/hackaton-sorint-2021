import {useTripListMutation} from "../services/trip.service";
import {useEffect} from "react";
import LoadingComponent from "../components/Loading.component";
import ConfirmedTrip from "../classes/ConfirmedTrip.class";
import ErrorComponent from "../components/Error.component";
import {useSelector} from "react-redux";
import {useAppSelector} from "../stores/store";
import TripWizard, {TripWizardProps} from "../components/TripWizard.component";

type HomePagePrivateProps = TripWizardProps;

const HomePagePrivate = (props: HomePagePrivateProps) => {
    const [doTrips, {isLoading, isError, data: tripsResponse, isSuccess}] = useTripListMutation();
    useEffect(() => {
        doTrips();
    }, [doTrips])
    if (isLoading)
        return <LoadingComponent/>;
    if(isSuccess) console.log(tripsResponse)
    return (
        <div>
            <TripWizard initialFrom={props.initialFrom} initialTo={props.initialTo} />
            {isError && <ErrorComponent error={"Error while loading trips"}/>}
            {isSuccess && (
                <>
                    <h1>Upcoming Trips</h1>
                    {
                        tripsResponse && tripsResponse.confirmedTrips.map((trip) => (
                            <div>
                                {trip.confirmedPickedUp} {trip.from} to {trip.to} {trip.arrival}
                            </div>
                        ))
                    }
                    <h1>To Be Scheduled Trip</h1>
                    {
                        tripsResponse && tripsResponse.toBeScheduledTrips.map((trip) => (
                            <div>
                                {trip.initialAvailability}-{trip.endAvailability} {trip.from} to {trip.to} {trip.arrival}
                            </div>
                        ))
                    }

                </>
            )
            }
        </div>
    );
}

export default HomePagePrivate;