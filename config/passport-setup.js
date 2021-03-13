const passport = require('passport');
const GoogleStrategy=  require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');


passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL: '/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken,refreshToken,profile,done) => {
        // passport callback function
        console.log("profile->"+profile.displayName);
        console.log("passport callback function called");
        new User({

        })
    })
)