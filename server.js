var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: "secret message" }));
//process.env.SESSION_SECRET

app.use(passport.initialize());
app.use(passport.session());


require ("./project/app.js")(app);
//require ("./assignment/app.js")(app);
require ("./test/app.js")(app);
//require ("./assignment/app.js")(app);

var port = process.env.PORT || 3000;


app.listen(port);