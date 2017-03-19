webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

var app = angular.module('app', []);

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});

app.controller('MainCtrl', function(RandomFactory, UserFactory) {
	var vm = this;

	vm.getRandomUser = getRandomUser;
	vm.login = login;

	function login(username, password) {
		UserFactory.login(username, password)
			.then(function success(response) {
				vm.user = response.data.user;
			}, handleError);
	}

	function getRandomUser() {
		RandomFactory.getUser()
			.then(function success(response) {
				vm.randomUser = response.data;
			}, handleError);
	};

	function handleError(response) {
		alert(response.data);
	}
});

app.factory('UserFactory', function($http, TokenFactory) {
	return {
		login: login
	}
	function login(username, password) {
		return $http.post('/login', {
			username : username,
			password: password
		}).then(function(response) {
			var token = response.data.token;
			TokenFactory.setToken(token);
			return response;
		});
	}
});

app.factory('TokenFactory', function($window) {
	
	var store = $window.localStorage;
	var key = "auth-token";

	return {
		setToken: setToken,
		getToken: getToken
	}

	function setToken(token) {

		if (token) {
			store.setItem(key, token);	
		} else {
			store.removeItem(key);
		}	
	}

	function getToken() {
		return store.getItem(key);
	}
});

app.factory('RandomFactory', function($http) {
	return {
		getUser: getUser
	}
	function getUser() {
		return $http.get('/random');
	}
});

app.factory('AuthInterceptor', function(TokenFactory) {
	return {
		request: addToken
	}

	function addToken(config) {
		var token = TokenFactory.getToken();
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = 'Bearer ' + token;
		}
		return config;
	}
})

/***/ })

},[2]);