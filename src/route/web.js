import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/thaithang', (req, res) => {
        return res.send("Hello ThaiThang")
    })

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.handleCreateNewUser)

    return app.use("/", router)
}

module.exports = initWebRoutes