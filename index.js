const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
//Running express Server
//Setup configuration that will listen to request and route them to different route handlers

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// app.get('/', (req, res) => {
//     //Calling a Route Handler
//     // '/' = localhost:5000/

//     res.send({
//         bye: 'buddy'
//     });
// }); //Route handler with express

const PORT = process.env.PORT || 5000;
// look at the underline environment to see what PORT needs to be used
// environment var = varables that are set in the underline runtime that node is running on top of
app.listen(PORT);
//localhost:5000