'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var expJwt = require('./middleware/exp-jwt');
var secretJwt = require('./config/secret');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(expJwt({ secret: secretJwt.secret }).unless( {path: ['/login']}));

app.use('/', require('./routes/index'));

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json(err.message);
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log('Server running at port', PORT);
});