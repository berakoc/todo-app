const todoRouter = require('express').Router()
const joiTodoSchema = require('../libs/Validator').joiTodoSchema
const { Todo } = require('../models/Todo')
const { consoleLogger } = require('../libs/Logger')

todoRouter.post('/add', async (req, res) => {
    const isTestingMode = req.body.isTestingMode
    delete req.body.isTestingMode
    const { error } = joiTodoSchema.validate(req.body)
    if (error) {
        if (!isTestingMode) {
            consoleLogger.error(error.details[0])
        }
        res.status(400).send(error.details[0].message)
        return
    }
    const todo = new Todo ({
        title: req.body.title,
        content: req.body.content,
        isFinished: req.body.isFinished,
        date: req.body.date
    })
    if (!isTestingMode) {
        await todo.save().catch(error => {
            consoleLogger.error(error.message)
            res.status(400).send('UniqueKeyError: Dates cannot be the same.')
            process.exit(1)
        })
        consoleLogger.info(`Todo[${todo}] added to the database.`)
    }
    res.json('Todo has been recorded to database.')
})

todoRouter.get('/', async (req, res) => {
    const isTestingMode = req.body.isTestingMode
    delete req.body.isTestingMode
    const query = req.query.all ? {} : { isFinished: req.query.isFinished || false }
    if (!isTestingMode) {
        const todos = await Todo.find(query)
        res.json(todos)
        consoleLogger.info(`Obtained ${req.query.all ? 'all' : req.query.isFinished === 'true' ? 'finished' : 'unfinished'} todos`)
        consoleLogger.info(`Number of records: ${todos.length}`)
    } else {
        res.json('Todos has been obtained from database.')
    }
})

todoRouter.put('/finish', async (req, res) => {
    const isTestingMode = req.body.isTestingMode
    if (!isTestingMode) {
        const query = {
            date: req.body.date
        }
        await Todo.findOneAndUpdate(query, { isFinished: true }, (err, updatedTodo) => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
            res.send(updatedTodo)
        })
    } else {
        res.json('Updated given todo as finished.')
    }
})

todoRouter.delete('/delete', async (req, res) => {
    const isTestingMode = req.body.isTestingMode
    if (!isTestingMode) {
        const query = {
            date: req.body.date
        }
        await Todo.deleteOne(query, err => {
            if (err) {
                consoleLogger.error(err)
                process.exit(1)
            }
            res.send(`Todo[date="${query.date}"] has been deleted.`)
        })
    } else {
        res.json('Deleted the given todo.')
    }
})

module.exports = todoRouter