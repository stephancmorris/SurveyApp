const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    //ID created from Mongo
}); //mongoose model instance => user ID

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
}); //user ID into a mongoose model instance


passport.use(new GoogleStrategy({
        //Config Options
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, //2nd Arguement = Callback
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ //MongoDB Query
            googleId: profile.id
        }).then((existingUser) => {
            if (existingUser) {
                //we already have a record with the profile ID
                done(null, existingUser);
            } else {
                new User({
                    googleId: profile.id //still need to add to the MongoDB
                    //.save saves it to the mondo
                }).save().then(user => done(null, user));
            }
        })
    }));