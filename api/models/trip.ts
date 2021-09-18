export default class Trip {
    public from: string;
    public to: string;
    public initialAvailability: Date;
    public endAvailability: Date;
    public arrival: Date;
    public userId: string;
    public id: string;
    public shiftId: string;
    public confirmedPickup: Date;

    setFrom(value: string) {
        this.from = value;
    }
    setTo(value: string) {
        this.to = value;
    }
    setInitialAvailability(value: Date) {
        this.initialAvailability = value;
    }
    setEndAvailability(value: Date) {
        this.endAvailability = value;
    }
    setArrival(value: Date) {
        this.arrival = value;
    }

    setUserId(value: string) {
        this.userId = value;
    }

    setId(value: string) {
        this.id = value;
    }
}
