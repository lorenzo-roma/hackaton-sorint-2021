import Checkpoint from "../../models/checkpoint";
import Position from "../../models/position";
import Shift from "../../models/shift";
import Trip from "../../models/trip";

const getMockTrip = (): Trip => {
    const trip = new Trip();
    trip.fromName = "";
    trip.toName = "";
    trip.fromPosition = new Position(29, 53);
    trip.toPosition = new Position(30, 23);
    trip.initialAvailability = new Date();
    trip.endAvailability = new Date();
    trip.arrival = new Date();
    trip.userId = "";
    return trip;
};

const getMockShift = (): Shift => {
    const shift = new Shift();
    shift.setUserId("");
    shift.setStart(new Date());
    shift.setEnd(new Date());
    shift.startingPosition = new Position(23, 23);
    shift.setCapacity(4);
    return shift;
};

const getMockCheckpoint = (): Checkpoint => {
    const checkpoint = new Checkpoint();
    return checkpoint;
};

export { getMockTrip, getMockShift, getMockCheckpoint };
