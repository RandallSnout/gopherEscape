//------------------  Requiers  --------------------------//
var express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require("body-parser"),
    path = require('path');

var sessionConfig = {
    secret:'CookieMonster', // Secret name for decoding secret and such
    resave:false, // Don't resave session if no changes were made
    saveUninitialized: true, // Don't save session if there was nothing initialized
    name:'myCookie', // Sets a custom cookie name
    cookie: {
        secure:false, // This need to be true, but only on HTTPS
        httpOnly:false, // Forces cookies to only be used over http
        maxAge: 3600000
    }
};

//------------------  Initialize  --------------------------//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(session(sessionConfig));
app.use(function(req, res, next){
    console.log(req.sessions);
    next();
});

//------------------  Database  --------------------------//
require('./server/config/mongoose.js');

//------------------  Routes  --------------------------//
var routes_setter = require('./server/config/routes.js');
routes_setter(app);


//------------------  Server  --------------------------//
app.listen(8000, function(){});


//-------------------------------------Gopher Code-----------------------//

