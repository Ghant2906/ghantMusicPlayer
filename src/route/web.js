import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import songController from "../controllers/songController"

let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', (req, res, next) => {
        next()
     }, homeController.getHomePage)
    router.get('/home', homeController.getHomePage)

    router.get('/login', (req, res) => {
        return res.render('login.ejs')
    })

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.handleCreateNewUser)
    router.get('/api/getUser/:token', userController.getUserByToken)
    router.get('/api/getSongNewRelease', songController.getSongNewReleases)

    return app.use("/", router)
}

module.exports = initWebRoutes