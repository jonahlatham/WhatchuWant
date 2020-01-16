const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcrypt')
const path = require('path');
require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname, '/build')));

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
                throw `Your credentials don't match our records.`
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
            const condition1 = /^[a-zA-Z]+$/.test(first_name)
            const condition2 = /^[a-zA-Z]+$/.test(last_name)
            const condition3 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            const condition4 = /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;()'])[a-zA-Z0-9!@#$%^&*_+-=:;()']{7,15}$/.test(password)
            if (user) {
                throw 'This email is already in use, please login.'
            } else if (!condition1 || !condition2 || !condition3 || !condition4) {
                throw 'Make sure all of the boxes are green before submitting.'
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

//all users

app.get('/api/people', (req, res, next) => {
    const db = app.get('db')
    db.people.find()
        .then((people) => {
            res.send({ people: people })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

const getUserName = (items, db) => {
    const promises = items.map((e) => {
        if (e.reserved_by_user_id) {
            return db.people.findOne({ id: e.reserved_by_user_id })
                .then((user) => {
                    e.user_name = `${user.first_name} ${user.last_name}`
                    return e
                })
        }
        else {
            e.user_name = ''
            return e
        }
    })
    return Promise.all(promises)
}

//items of one user
app.get(`/api/displayItems/:id`, (req, res, next) => {
    const db = app.get('db')
    const id = Number(req.params.id) > 0 ? req.params.id : req.session.user.id
    db.items.find({ creator_id: id })
        .then((items) => {
            return getUserName(items, db)
        })
        .then((items) => {
            res.send({ items: items })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//add new items

app.post('/api/createNew', (req, res, next) => {
    const db = app.get('db')
    const date = new Date()
    const { name, price, holiday_id, img, rating } = req.body
    db.items.insert({ name, price, holiday_id, img, rating, creator_id: req.session.user.id, reserved_by_user_id: null, date_created: date, date_updated: date })
        .then((item) => {
            res.send({ success: true, item })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//delete item

app.delete('/api/displayItems/:id', (req, res, next) => {
    const db = app.get('db')
    db.items.destroy({ id: req.params.id })
        .then((response) => {
            return db.items.find()
                .then((response) => {
                    res.send({ success: true, items: response })
                })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

//reserve item

app.put('/api/createNew', (req, res, next) => {
    const db = app.get('db')
    db.items.update({ id: req.body.item_id }, { reserved_by_user_id: req.session.user.id })
        .then((items) => {
            return db.items.find({ creator_id: req.session.user.id })
        })
        .then((items) => {
            return getUserName(items, db)
        })
        .then((items) => {
            res.send({ items: items })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

app.put('/api/createNewTwo', (req, res, next) => {
    const db = app.get('db')
    db.items.findOne({ id: req.body.item_id })
        .then((item) => {
            if (item.reserved_by_user_id === req.session.user.id) {
                return db.items.update({ id: req.body.item_id }, { reserved_by_user_id: null })
            } else {
                throw 'Something went wrong!!!'
            }
        })
        .then((items) => {
            return db.items.find({ creator_id: req.session.user.id })
        })
        .then((items) => {
            return getUserName(items, db)
        })
        .then((items) => {
            res.send({ items: items })
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

app.get('/*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
    })
});

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:8090