import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import songController from "../controllers/songController"
import artistController from "../controllers/artistController"
import playlistController from "../controllers/playListController"

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

    router.get('/forgot-password', (req, res) => {
        return res.render('forgotPassword.ejs')
    })

    router.get('/reset-password/:token', (req, res) => {
        return res.render('resetPassword.ejs')
    })

    router.get('/playlist', (req, res, next) => {
        if (!req.cookies.token) {
            return res.render('login.ejs')
        } else {
            next()
        }
    }, playlistController.getPlaylistPage)


    router.post('/api/login', userController.handleLogin)
    router.post('/api/register', userController.handleCreateNewUser)
    router.delete('/api/logout', userController.handleLogout)
    router.get('/api/getUser/:token', userController.getUserByToken)
    router.get('/api/getSongNewRelease', songController.getSongNewReleases)
    router.get('/api/getTopSongs', songController.getTopSongs)
    router.get('/api/getArtist', artistController.getArtistById)
    router.get('/api/search/:name', songController.searchSongs)
    router.get('/api/playlist/:idUser', playlistController.getPlaylist)
    router.post('/api/addSongToPlaylist', playlistController.addToPlaylist)
    router.post('/api/sendMailVerify', userController.handleSendMailVerify)
    router.get('/api/getUserByTokenReset/:token', userController.getUserByTokenReset)
    router.post('/api/resetPassword', userController.handleResetPassword)

    return app.use("/", router)
}

module.exports = initWebRoutes