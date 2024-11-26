require("./db")

const Student = require("./models/student.model")
const Cohort = require("./models/cohort.model")

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { isObjectIdOrHexString } = require("mongoose")

const app = express()

app.use(
    cors({ origin: "http://localhost:5173" })
)

app.use(logger('dev'))
app.use(express.json())

//STUDENTS
//Create
app.post('/api/students', (req, res) => {

    Student
        .create(req.body)
        .then(createdStudent => res.json(createdStudent))
        .catch(err => console.log('Esto es un error', err))
})

//Read all studets
app.get('/api/students', (req, res) => {

    Student
        .find()
        .populate("cohort")
        .then(allStudents => res.json(allStudents))
        .catch(err => console.log('Ups', err))
})


//Read student by id
app.get('/api/students/:studentId', (req, res) => {

    const { studentId } = req.params

    Student
        .findById(studentId)
        .populate("cohort")
        .then(studentById => res.json(studentById))
        .catch(err => console.log('Upsi', err))
})


//Read all students from cohort
app.get('/api/students/cohort/:cohortId', (req, res) => {

    const { cohortId } = req.params

    Student
        .find({ cohort: cohortId })
        .populate("cohort")
        .then(studentsOfCohort => res.json(studentsOfCohort))
        .catch(err => console.log('Upsi', err))
})


//Update student
app.put('/api/students/:studentId', (req, res) => {

    const { studentId } = req.params

    Student
        .findByIdAndUpdate(
            studentId,
            req.body,
            { new: true }
        )
        .then(newStudentDetails => res.json(newStudentDetails))
        .catch(err => console.log('Upsi', err))
})


//Delete student
app.delete('/api/students/:studentId', (req, res) => {

    const { studentId } = req.params

    Student
        .findByIdAndDelete(studentId)
        .then(studentDeleted => res.json(studentDeleted))
        .catch(err => console.log('Upsi', err))
})


//__________________________//


//COHORTS
//Create
app.post('/api/cohorts', (req, res) => {

    Cohort
        .create(req.body)
        .then(createdCohort => res.json(createdCohort))
        .catch(err => console.log('Esto es un error', err))
})


//Read all cohorts
app.get('/api/cohorts', (req, res) => {

    Cohort
        .find()
        .then(allCohorts => res.json(allCohorts))
        .catch(err => console.log('Ups', err))
})


//Read selected cohort
app.get('/api/cohorts/:cohortId', (req, res) => {

    const { cohortId } = req.params

    Cohort
        .findById(cohortId)
        .then(cohortById => res.json(cohortById))
        .catch(err => console.log('Upsi', err))
})


//Update cohort
app.put('/api/cohorts/:cohortId', (req, res) => {

    const { cohortId } = req.params

    Cohort
        .findByIdAndUpdate(
            cohortId,
            req.body,
            { new: true }
        )
        .then(newCohortDetails => res.json(newCohortDetails))
        .catch(err => console.log('Upsi', err))
})


//Delete student
app.delete('/api/cohorts/:cohortId', (req, res) => {

    const { cohortId } = req.params

    Cohort
        .findByIdAndDelete(cohortId)
        .then(cohortDeleted => res.json(cohortDeleted))
        .catch(err => console.log('Upsi', err))
})


app.listen(5005, () => console.log('Server running on port 5005'))
