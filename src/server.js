import express from "express"
import bodyParser from "body-parser"
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web'
import cors from 'cors'
import path from 'path'
import session from "express-session";
import passport from "passport";
var cookieParser = require('cookie-parser')
require('./passport')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(cookieParser())

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    name: 'userSessionId',
    cookie: { secure: false, maxAge: 3600000 }
}))

app.use(passport.initialize())
app.use(passport.session())

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("Server listening on port: " + port)
})