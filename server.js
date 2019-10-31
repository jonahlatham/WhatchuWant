const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
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

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        //days hours minutes seconds milseconds
        expires: 1 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}))

app.use('/api/*', (req, res, next) => {
    if (!req.session.user) {
        res.send({ success: false, message: 'Please login.' })
    } else {
        next()
    }
})

app.get('/auth/user', (req, res, next) => {
    if (req.session.user) {
        res.send({ success: true, user: req.session.user })
    } else {
        res.send({ success: false })
    }
})

app.delete('/auth/user', (req, res, next) => {
    req.session.destroy()
    res.send({ success: true })
})

///////////////////////////////////////////////////////////////////

app.post('/auth/login', (req, res, next) => {
    const db = app.get('db');
    const { email, password } = req.body
    let catchUser = {}
    db.people.findOne({ email })
        .then((user) => {
            if (!user) {
                throw 'We could not find a user for this email. Please register.'
            } else {
                catchUser = user;
                return bcrypt.compare(password, user.password)
            }
        })
        .then((isMatch) => {
            if (!isMatch) {
                throw (`Your credentials don't match our records.`)
            }
            delete catchUser.password
            req.session.user = catchUser;
            res.send({ success: true, user: catchUser })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

////////////////////////////////////////////////////////////////////////////

app.post('/auth/register', (req, res, next) => {
    const db = app.get('db');
    const { email, password, first_name, last_name, dob } = req.body
    db.people.findOne({ email })
        .then((user) => {
            if (user) {
                throw 'This email is already in use, please login.'
            } else {
                return bcrypt.hash(password, 10)
            }
        })
        .then((hash) => {
            return db.people.insert({ email, password: hash, first_name, last_name, dob })
        })
        .then((user) => {
            delete user.password
            req.session.user = user;
            res.send({ success: true, user })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//////////////////////////////////////////////////////////////////////////////////////

//add new items

app.post('/api/createNew', (req, res, nest) => {
    const db = app.get('db')
    const date = new Date()
    const { name, holiday_id, img } = req.body
    db.items.insert({ name, holiday_id, img, creator_id: req.session.user.id, date_created: date, date_updated: date })
        .then((item) => {
            res.send(item)
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

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