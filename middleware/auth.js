'use strict';

function authenticate(req, res, next) {
	var body = req.body;
	
	var user = {
		username : "mundathan",
		password : "p"
	}

	if (!body.username || !body.password ) {
		res.status(404).end('User name or password is required');
	} else if (body.username !== user.username || body.password !== user.password) {
		res.status(404).end('User name or password is not valid');
	} else {
		next();
	}
}

module.exports.authenticate = authenticate;