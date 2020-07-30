export default class Utils {

    private static addZerosToTimeValue(value: number): string {
        return ('0'.repeat(2) + value).slice(-2)
    }

    static convertDateToString(date: Date): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${this.addZerosToTimeValue(date.getHours())}:${this.addZerosToTimeValue(date.getMinutes())}:${this.addZerosToTimeValue(date.getSeconds())}`
    }
}