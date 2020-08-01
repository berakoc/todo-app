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

module.exports = {
    generateRandomPort,
    DatabaseNotFoundError
}