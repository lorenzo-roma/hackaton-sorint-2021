import {useCalculateShiftMutation, useRetrieveShiftMutation} from "../../../services/shift.service";
import LoadingComponent from "../../../components/Loading.component";
import ErrorComponent from "../../../components/Error.component";
import moment from "moment";
import React, {useEffect, useState} from "react";
import Checkpoint, {HopType} from "../../../classes/Checkpoint.class";
import {Button} from "../../../components/system/InputText";
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import GoogleMapOption from "../../../config/MapOptions";

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

        const {isLoaded, loadError} = useJsApiLoader({googleMapsApiKey: "AIzaSyAzxSHMke4V7MM3TfjToxzcSCVtQrTPe2g"});
        useEffect(() => {
            doShiftRetrieve(props.id);
        }, [doShiftRetrieve, props.id]);
        if (isRetrieveLoading) return <LoadingComponent/>
        if (isRetrieveError || !shift) return <ErrorComponent error="Error retrieving shift detail"/>

        function startCalculateShift() {
            doCalculateShift(props.id).unwrap().then(() => doShiftRetrieve(props.id));
        }

        console.log("Shift", shift)

        return (
            <div>
                <h1>{moment(shift.start).format("DD MMMM")}</h1>
                <p>{moment(shift.start).format("HH:mm")} - {moment(shift.end).format("HH:mm")}</p>
                {shift.checkpoints.length > 0 && (
                    <>
                        {isLoaded && <Map checkpoints={shift.checkpoints}/>}
                        {
                            shift.checkpoints.map(checkpoint => (
                                <div key={checkpoint.id}>
                                    {moment(checkpoint.time).format('HH:mm')}
                                    {checkpoint.user.name} {checkpoint.user.surname}
                                    {checkpoint.positionName}
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
                        {isRetrieveError && <ErrorComponent error="Error while calculating path"/>}
                    </>
                )}
            </div>
        );

    }
;


const Map = ({checkpoints}: { checkpoints: Checkpoint[] }) => {
    useEffect(() => {
        const directionOption: google.maps.DirectionsRequest = {
            destination: {location: new google.maps.LatLng(checkpoints[checkpoints.length - 1].position.lat, checkpoints[checkpoints.length - 1].position.lng)},
            origin: {location: new google.maps.LatLng(checkpoints[0].position.lat, checkpoints[0].position.lng)},
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: false,
            waypoints: checkpoints.slice(1, checkpoints.length-1).map((checkpoint) => {
                return {location: new google.maps.LatLng(checkpoint.position.lat, checkpoint.position.lng)}
            }),
        }
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(directionOption, (result, status) => {
            console.log("ROUTE DONE", result)
            if (status === google.maps.DirectionsStatus.OK) {
                setDirectionResult(result,);
            } else {
                console.error(`error fetching directions`, result);
            }
        });
    }, [])
    const [directionResult, setDirectionResult] = useState<google.maps.DirectionsResult | null>(null);
    console.log("DIR", directionResult)
    return (<div className="map-container">
        <GoogleMap zoom={7}
                   options={{styles: GoogleMapOption}}
                   center={new google.maps.LatLng(0, 0)}>
            {directionResult && <DirectionsRenderer directions={directionResult} />}
        </GoogleMap>
    </div>);
}

export default ShiftDetailPage;