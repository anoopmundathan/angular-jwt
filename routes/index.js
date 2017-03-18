'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var randomNumber = Math.round(Math.random() * 100);
	res.json({
		number: randomNumber
	});
});

module.exports = router;