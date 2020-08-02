const mongoose = require('mongoose')
require('dotenv').config()
const Θ = {
    testDbUrl: process.env.DB_URL
}
const TestTodo = mongoose.model('TestTodo', require('./Todo').todoSchema)
const { convertDateToString } = require('../libs/Utils')
const { consoleLogger } = require('../libs/Logger')
const todoData = {
    title: 'Test Title',
    content: 'Test content',
    date: convertDateToString(new Date())
}

describe('Todo Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(Θ.testDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
        })
    })

    it('Create and Todo successfully', async done => {
        const validTodo = new TestTodo(todoData)
        const savedTodo = await validTodo.save()
        expect(savedTodo._id).toBeDefined()
        expect(savedTodo.title).toBe(todoData.title)
        expect(savedTodo.content).toBe(todoData.content)
        expect(savedTodo.date).toBe(todoData.date)
        done()
    })

    afterAll(() => {
        mongoose.connection.db.dropCollection('testtodos', () => {
            mongoose.disconnect()
            consoleLogger.info('Document[testtodos] has been removed from the database')
        })
    })
})