import express from "express"
import bodyParser from "body-parser"
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web'
import cors from 'cors'
import path from 'path'
var cookieParser = require('cookie-parser')
require('dotenv').config()

let app = express()
app.use(cors())
app.use(cookieParser())

app.use('/public', express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("Server listening on port: " + port)
})