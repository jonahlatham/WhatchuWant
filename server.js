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
//displaying people
app.get('/api/whatchuwant', (req, res, next) => {
    const db = app.get('db')
    db.people.find()
        .then((people) => {
            res.send(people)
        })
})
//create new items
app.post('/api/whatchuwant/wishlist', (req, res, next) => {
    const db = app.get('db')
    const { name, link, holiday, price } = req.body
    db.wish_list.insert({ name, link, holiday, price })
        .then((items) => {
            res.send(items)
        })
})
//displaying new items
app.get('/api/whatchuwant/wishlist', (req, res, next) => {
    const db = app.get('db')
    db.wish_list.find()
        .then((items) => {
            res.send(items)
        })
})
//////////////////////////////////////////////////////////////////

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:8090/api/whatchuwant