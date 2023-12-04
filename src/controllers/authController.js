const passport = require('passport')
const jwt = require('jsonwebtoken');
import db from "../models/index"

let loginWithGoogle = (req, res) => {
    passport.authenticate('google', {
        scope:
            ['profile']
    })(req, res)
}

let googleCallback = (req, res) => {
    res.redirect('/auth/success')
}

let callbackFailure = (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Login in failure'
    })(req, res)
}

let callbackSuccess = async (req, res) => {
    let user = req.user;
    let token;
    let checkUser = await db.User.findOne({
        where: { idGG: user.id }
    })
    if (checkUser) {
        token = jwt.sign({ id: checkUser.id, userName: checkUser.userName }, process.env.KEY_COOKIE)
        res.cookie('token', token);
    } else {
        await db.User.create({
            userName: user.displayName,
            idGG: user.id
        }).then((newUser) => {
            token = jwt.sign({ id: newUser.dataValues.id, userName: newUser.dataValues.userName }, process.env.KEY_COOKIE)
            res.cookie('token', token);
        })
    }
    res.redirect('/')
}

module.exports = {
    loginWithGoogle: loginWithGoogle,
    googleCallback: googleCallback,
    callbackFailure: callbackFailure,
    callbackSuccess: callbackSuccess
}