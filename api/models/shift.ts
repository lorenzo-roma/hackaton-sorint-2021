export default class Shift {
    public id: string;
    public userId: string;
    public start: Date;
    public end: Date;
    public startingPosition: string;
    public capacity: number;

    setId(value: string) {
        this.id = value;
    }

    setUserId(value: string) {
        this.userId = value;
    }
    setStart(value: Date) {
        this.start = value;
    }
    setEnd(value: Date) {
        this.end = value;
    }
    setStartingPosition(value: string) {
        this.startingPosition = value;
    }
    setCapacity(value: number) {
        this.capacity = value;
    }
}
