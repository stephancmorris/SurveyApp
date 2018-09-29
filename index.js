const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
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

if (process.env.NODE_ENV === 'product') {
	// Express will serve up production assets
	//Example: main.js & main.css
	app.use(express.static('client/build'));

	//Express will produce the index.html file
	//when it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
	// Catch all case
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
