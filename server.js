'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use('/random', require('./routes/index'));

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log('Server running at port', PORT);
});