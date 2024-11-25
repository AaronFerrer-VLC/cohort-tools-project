const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(
    cors({ origin: "http://localhost:5173" })
)

app.use(logger('dev'))
app.use(express.json())

app.get('/api/cohorts', (req, res) => {

    const cohorts = require('./cohorts.json')

    res.json(cohorts)
})

app.get('/api/students', (req, res) => {

    const students = require('./students.json')

    res.json(students)
})

app.get('/*', (req, res) => {
    res.json('404')
})

app.listen(5005, () => console.log('Server running on port 5005'))
