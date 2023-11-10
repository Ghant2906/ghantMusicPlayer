import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import songController from "../controllers/songController"
import artistController from "../controllers/artistController"

let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', (req, res, next) => {
        next()
     }, homeController.getHomePage)
    router.get('/home', homeController.getHomePage)

    router.get('/login', (req, res) => {
        return res.render('login.ejs')
    })
    router.get('/register', (req, res) => {
        return res.render('register.ejs')
    })

    router.post('/api/login', userController.handleLogin)
    router.post('/api/register', userController.handleCreateNewUser)
    router.get('/api/getUser/:token', userController.getUserByToken)
    router.get('/api/getSongNewRelease', songController.getSongNewReleases)
    router.get('/api/getTopSongs', songController.getTopSongs)
    router.get('/api/getArtist', artistController.getArtistById)
    router.get('/api/search/:name', songController.searchSongs)

    return app.use("/", router)
}

module.exports = initWebRoutes