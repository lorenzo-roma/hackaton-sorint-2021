import moment from "moment";

export default class DateFormat {
    static toShortDateAndTime(date: Date) {
        return moment(date).format("D MMM H:MM")
    }
}