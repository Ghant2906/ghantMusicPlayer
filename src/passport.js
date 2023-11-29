const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
require('dotenv').config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GG_CLIENT_ID,
            clientSecret: process.env.GG_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done){
            done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user)
})