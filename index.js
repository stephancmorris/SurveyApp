const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
//Running express Server
//Setup configuration that will listen to request and route them to different route handlers

app.use(bodyParser.json());

app.use(
	//app.use activates Express middleware
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookieKey ]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	const path = require('path'); //We need path earlier for this!
	app.use(express.static(path.join(__dirname, '/client/build')));
	//No more changes from here on now
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

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
