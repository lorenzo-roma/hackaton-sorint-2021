import Shift from "../../models/shift";
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

const getMockShift = (): Shift => {
    const shift = new Shift();
    shift.setUserId("");
    shift.setStart(new Date());
    shift.setEnd(new Date());
    shift.setStartingPosition("");
    shift.setCapacity(4);
    return shift;
};

export { getMockTrip, getMockShift };
