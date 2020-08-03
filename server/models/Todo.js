const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isFinished: {
        type: Boolean,
        required: true,
    },
    date: {
        type: String,
        required: true,
        unique: true,
    }
})

const Todo = model('Todo', todoSchema)

module.exports = {
    Todo,
    todoSchema
}