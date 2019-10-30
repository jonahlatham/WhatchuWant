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

//add new items

// app.post('/api/createNew', (req, res, nest) => {
//     const db = app.get('db')
//     const date = new Date()
//     const { name, holiday_id, img } = req.body
//     db.items.insert({ name, holiday_id, img, creator_id: req.session.user.id, date_created: date, date_updated: date })
//         .catch((err) => {
//             res.send({ success: false, err })
//         })
// })

//holidays

app.get('/api/holidays', (req, res, next) => {
    const db = app.get('db')
    db.holidays.find()
        .then((holidays) => {
            res.send({ holidays: holidays })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//displaying people

//displaying new items

app.get('/api/displayItems', (req, res, next) => {
    const db = app.get('db')
    db.items.find()
        .then((items) => {
            res.send({ items: items })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:8090