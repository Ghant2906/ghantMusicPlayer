import express from "express"
import bodyParser from "body-parser"
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web'
import cors from 'cors'
import path from 'path'
require('dotenv').config()

let app = express()
app.use(cors({ origin: true }))

app.use('/public', express.static(path.join(__dirname,'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

// connectDB()

let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("Server listening on port: " + port)
})