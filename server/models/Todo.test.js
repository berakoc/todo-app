const mongoose = require('mongoose')
require('dotenv').config()
const Θ = {
    testDbUrl: process.env.DB_URL
}
const TestTodo = mongoose.model('TestTodo', require('./Todo').todoSchema)
const DemoTodo = mongoose.model('DemoTodo', require('./Todo').todoSchema, 'todo-demo')
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

    it('Obtain Todo successfully', async done => {
        await DemoTodo.find({}, (err, todos) => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
            const demoTodo = todos[0]
            expect(demoTodo._id).toBeDefined()
            expect(demoTodo._doc.title).toBe('Demo Title')
            expect(demoTodo._doc.content).toBe('Demo content')
            expect(demoTodo._doc.date).toBe('Aug 3, 2020 00:57:17')
            done()
        })
    })

    afterAll(() => {
        mongoose.connection.db.dropCollection('testtodos', () => {
            mongoose.disconnect()
            consoleLogger.info('Document[testtodos] has been removed from the database')
        })
    })
})