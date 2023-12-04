const passport = require('passport')

let loginWithGoogle = (req, res) => {
    passport.authenticate('google', {
        scope:
            ['profile', 'email'],
        session: false
    })(req, res)
}

let googleCallback = (req, res, next) => {
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    })(req, res, next)
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