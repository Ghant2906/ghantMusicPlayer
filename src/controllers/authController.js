import authService from "../services/authService"
import homeController from "../controllers/homeController"

const passport = require('passport')

let loginWithGoogle = (req, res) => {
    passport.authenticate('google', {
        scope:
            ['profile', 'email']
    })(req, res)
}

let googleCallback = (req, res) => {
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })(req, res)
}

let callbackFailure = (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Login in failure'
    })(req, res)
}

let callbackSuccess = (req, res) => {
    res.redirect('/')
} 

module.exports = {
    loginWithGoogle: loginWithGoogle,
    googleCallback: googleCallback,
    callbackFailure: callbackFailure,
    callbackSuccess: callbackSuccess
}