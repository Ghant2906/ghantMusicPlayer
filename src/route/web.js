import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', (req, res, next) => {

     }, homeController.getHomePage)
    router.get('/home', homeController.getHomePage)

    router.get('/login', (req, res) => {
        return res.render('login.ejs')
    })

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.handleCreateNewUser)
    router.get('/api/getUser', userController.getUserByToken)

    return app.use("/", router)
}

module.exports = initWebRoutes