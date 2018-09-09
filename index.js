const express = require('express');
const app = express();
//Running express Server
//Setup configuration that will listen to request and route them to different route handlers

app.get('/', (req, res) => {
    //Calling a Route Handler
    // '/' = localhost:5000/

    res.send({
        bye: 'buddy'
    });
}); //Route handler with express

const PORT = process.env.PORT || 5000;
// look at the underline environment to see what PORT needs to be used
// environment var = varables that are set in the underline runtime that node is running on top of
app.listen(PORT);
//Express tells Node to listen for port 5000



//localhost:5000