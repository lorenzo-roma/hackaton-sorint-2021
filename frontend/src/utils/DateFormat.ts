import moment from "moment";

export default class DateFormat {
    static toShortDateAndTime(date: Date) {
        return moment(date).format("D MMM H:mm")
    }
    static toShortDate(date: Date) {
        return moment(date).format("D MMM")
    }
    static toShortDay(date: Date) {
        return moment(date).format("D")
    }
    static toShortMonth(date: Date) {
        return moment(date).format("MMM")
    }
}