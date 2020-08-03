import { ArrayRemoveReturnType } from './Interfaces'

export default class Utils {

    private static addZerosToTimeValue(value: number): string {
        return ('0'.repeat(2) + value).slice(-2)
    }

    static convertDateToString(date: Date): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${this.addZerosToTimeValue(date.getHours())}:${this.addZerosToTimeValue(date.getMinutes())}:${this.addZerosToTimeValue(date.getSeconds())}`
    }

    static removeArrayElement<T>(array: Array<T>, removalIndex: number): ArrayRemoveReturnType<T> {
        return {
            array: [...array.slice(0, removalIndex), ...array.slice(removalIndex + 1)],
            removedElement: array[removalIndex]
        }
    }
}