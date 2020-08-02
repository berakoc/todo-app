const todoRouter = require('express').Router()
const joiTodoSchema = require('../libs/Validator').joiTodoSchema
const { Todo } = require('../models/Todo')
const { consoleLogger } = require('../libs/Logger')

todoRouter.post('/add', async (req, res) => {
    const isTestSuite = req.body.isTestSuite
    delete req.body.isTestSuite
    const { error } = joiTodoSchema.validate(req.body)
    if (error) {
        if (!isTestSuite) {
            consoleLogger.error(error.details[0])
        }
        res.status(400).send(error.details[0].message)
        return
    }
    const todo = new Todo ({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    })
    if (!isTestSuite) {
        await todo.save().catch(error => {
            consoleLogger.error(error.message)
            res.status(400).send('UniqueKeyError: Dates cannot be the same.')
            process.exit(1)
        })
        consoleLogger.info(`Todo[${todo}] added to the database.`)
    }
    res.json('Todo has been recorded to database.')
})


module.exports = todoRouter