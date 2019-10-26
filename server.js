const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const expressSession = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

massive(process.env.DATABASE_URL)
    .then((dbInstance) => {
        console.log(`DB is connected`)
        app.set('db', dbInstance)
    })

//////////////////////////////////////////////////////////////////
const body = [
    {
        id: 1,
        task: 'Do the dishes dammit!',
        isCompleted: false
    },
]
let id = 1

app.get('/api/Home', (req, res, next) => {
    res.send(body)
})

app.post('/api/Home', (req, res, next) => {
    id++
    const addedTask = {
        id,
        task: req.body.task,
        isCompleted: false
    }
    body.push(addedTask)
    res.send(body)
})

//displaying people

//create new items

//displaying new items

//////////////////////////////////////////////////////////////////

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:8090/api/whatchuwant