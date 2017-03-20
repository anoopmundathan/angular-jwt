var jwt = require('jsonwebtoken');
var async = require('async');
var set = require('lodash.set');
var unless = require('express-unless');

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

function wrapStaticSecretInCallback(secret){
  return function(_, __, cb){
    return cb(null, secret);
  };
}

module.exports = function(options) {
  if (!options || !options.secret) throw new Error('secret should be set mate');

  var secretCallback = options.secret;
  if (!isFunction(secretCallback)){
    secretCallback = wrapStaticSecretInCallback(secretCallback);
  }

  var middleware = function(req, res, next) {
    
    var token;

    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
    
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } 

      var dtoken = jwt.decode(token, { complete: true }) || {};
      console.log(dtoken);

      async.waterfall([
        function getSecret(callback) {
          secretCallback(req, dtoken.payload, callback);    
        },
        function verifyToken(secret, callback) {
          jwt.verify(token, secret, options, function(err, decoded) {
            callback(null, decoded);
        })}] ,
        function (err, result){
          if (err) { 
            return next(err); 
          }
          set(req, 'user', result);
          next();
        });
    } else {
      var err = new Error('Not Authorized');
      err.status = 404;
      return next(err);
    }

    return next();
  } 

  middleware.unless = unless;
  return middleware;
}