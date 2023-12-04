import express from "express"
import bodyParser from "body-parser"
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web'
import cors from 'cors'
import path from 'path'
import cookieSession from "cookie-session";
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

app.use(cookieSession({
  name: 'userSession',
  keys: [process.env.KEY_COOKIE],
  maxAge: 60 * 60 * 1000,
  signed: false,
}));

app.use(passport.initialize())
app.use(passport.session())

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969

app.listen(port, () => {
  console.log("Server listening on port: " + port)
})