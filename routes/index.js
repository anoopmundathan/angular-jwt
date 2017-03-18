'use strict';

var express = require('express');
var router = express.Router();
var mid = require('../middleware/auth');
var jwt = require('jsonwebtoken');

var faker = require('faker');

var secret = 'osdlfj!@@#$#@lk234klsdjl979234';

router.post('/login', mid.authenticate, function(req, res) {

	var token = jwt.sign(req.body.username, secret);
	res.json({
		user: req.body.username,
		token: token
	});
});

router.get('/random', function(req, res, next) {

	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();

	res.json(user);
});

module.exports = router;