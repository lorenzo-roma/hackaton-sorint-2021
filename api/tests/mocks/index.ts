import Trip from "../../models/trip";

const getMockTrip = (): Trip => {
    const trip = new Trip();
    trip.setFrom("");
    trip.setTo("");
    trip.setInitialAvailability(new Date());
    trip.setEndAvailability(new Date());
    trip.setArrival(new Date());
    trip.setUserId("");
    return trip;
};

export { getMockTrip };
