const generateRandomPort = () => {
    return 3001 + Math.floor(Math.random() * 5000)
}

class DatabaseNotFoundError extends Error {

    constructor(message) {
        if (typeof message === 'string' || typeof message === 'undefined') {
            super(message || 'Database is not found. Update the \\.env file.')
            this.name = 'DatabaseNotFoundError'
        } else {
            throw TypeError(`Message must be in type string. The given message is in type <${typeof message}>`);
        }
    }
}

function addZerosToTimeValue(value) {
    return ('0'.repeat(2) + value).slice(-2)
}

const convertDateToString = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${addZerosToTimeValue(date.getHours())}:${addZerosToTimeValue(date.getMinutes())}:${addZerosToTimeValue(date.getSeconds())}`
}

module.exports = {
    generateRandomPort,
    DatabaseNotFoundError,
    convertDateToString
}