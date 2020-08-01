console.clear()
// Imported the libraries that are crucial for backend
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// Configured the .env file and injected it into node
require('dotenv').config()
const { generateRandomPort, DatabaseNotFoundError } = require('./libs/Utils')

// Variable for enviroment variables
const Δ = {
    port: process.env.PORT || generateRandomPort(),
    db: process.env.DB_URL
}

// Defined backend cors policy and set json as data protocol
app.use(cors())
app.use(express.json())
// Inject the routes to the app
const todoRouter = require('./routes/todo.routes')
app.use('/api/todo-io/todos', todoRouter)

// Created a basic route for handlind main page of REST API
app.get('/', (_req, res) => {
    res.send('<div style="width: 100%; text-align: center; user-select: none; margin-top: 40px; font-size: 4vw; color: rgba(0,0,0,0.7);"><a href=\"https://restfulapi.net/\" target=\"_blank\" rel=\"noopener noreferrer\" style="font-size: 6vw; font-family:monospace; color: #0070F3;">REST API</a> is ready for you to use. Enjoy! <div style="font-size: 10vw; margin-top: 40px;">🤖</div></div>')
})

// Server started
app.listen(Δ.port, () => {
    console.log('\x1b[34m%s\x1b[0m', `Server started on http://localhost:${Δ.port}`)
})

// Error handling and starting the database
try {
    if (Δ.db === undefined) throw new DatabaseNotFoundError()
    mongoose.connect(Δ.db, { useUnifiedTopology: true, useNewUrlParser: true}, () => {
        console.log('\x1b[35m%s\x1b[0m', 'Connected to database')
    })
} catch (err) {
    console.log(err)
}