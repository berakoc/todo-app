const todoRouter = require('express').Router()
const joiTodoSchema = require('../libs/Validator').joiTodoSchema
const { Todo } = require('../models/Todo')

todoRouter.post('/add', async (req, res) => {
    const { error } = joiTodoSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    const todo = new Todo ({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    })
    await todo.save()
    res.send('Todo has been recorded to database.')
})


module.exports = todoRouter