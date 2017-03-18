'use strict';

var express = require('express');
var router = express.Router();
var faker = require('faker');

router.get('/', function(req, res, next) {

	var user = faker.helpers.userCard();
	user.avatar = faker.image.avatar();

	res.json(user);
});

module.exports = router;