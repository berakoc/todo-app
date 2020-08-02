const app = require('./server')
const mongoose = require('mongoose')

// Variable for enviroment variables
const Δ = {
    port: process.env.PORT || generateRandomPort(),
    db: process.env.DB_URL
}

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