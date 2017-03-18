'use strict';

var angular = require('angular');

var app = angular.module('app', []);

app.controller('MainCtrl', function(RandomFactory, UserFactory) {
	var vm = this;

	vm.getRandomUser = getRandomUser;
	vm.login = login;

	function login() {
		UserFactory.login(vm.username, vm.password);
	}

	function getRandomUser() {
		RandomFactory.getUser()
			.then(function success(response) {
				vm.randomUser = response.data;
			});
	};
});

app.factory('UserFactory', function($http) {
	return {
		login: login
	}

	function login(username, password) {
		
		return $http.post('/login', {
			username : username,
			password: password
		});
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