const mongoose = require('mongoose')
require('dotenv').config()
const Θ = {
    testDbUrl: process.env.DB_URL
}
const TestTodo = mongoose.model('TestTodo', require('./Todo').todoSchema)
const DemoTodo = mongoose.model('DemoTodo', require('./Todo').todoSchema, 'todo-demo')
const { convertDateToString } = require('../libs/Utils')
const { consoleLogger } = require('../libs/Logger')
const testTodoData = {
    title: 'Test Title',
    content: 'Test content',
    isFinished: false,
    date: 'Aug 5, 2020 03:14:32'
}
const anotherTodoData = {
    title: 'Removed Title',
    content: 'Removed content',
    isFinished: false,
    date: 'Aug 5, 2020 03:15:17'
}

const createTodo = (todoData=testTodoData) => {
    const validTodo = new TestTodo(todoData)
    return validTodo.save()
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

    it('should create todo', async done => {
        const savedTodo = await createTodo()
        expect(savedTodo._id).toBeDefined()
        expect(savedTodo.title).toBe(testTodoData.title)
        expect(savedTodo.content).toBe(testTodoData.content)
        expect(savedTodo.isFinished).toBe(testTodoData.isFinished)
        expect(savedTodo.date).toBe(testTodoData.date)
        done()
    })

    it('should obtain todo', async done => {
        await DemoTodo.find({}, (err, todos) => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
            const demoTodo = todos[0]
            expect(demoTodo._id).toBeDefined()
            expect(demoTodo._doc.title).toBe('Demo Title')
            expect(demoTodo._doc.content).toBe('Demo content')
            expect(demoTodo._doc.isFinished).toBe(false)
            expect(demoTodo._doc.date).toBe('Aug 3, 2020 00:57:17')
            done()
        })
    })

    it('should remove a todo', async done => {
        const savedTodo = await createTodo(anotherTodoData)
        TestTodo.deleteOne({ date: savedTodo.date }, err => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
            expect(err).toBe(null)
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