'use strict';

var angular = require('angular');

var app = angular.module('app', []);

app.controller('MainCtrl', function(RandomFactory) {
	var vm = this;

	vm.getRandomUser = getRandomUser;

	function getRandomUser() {
		RandomFactory.getUser()
			.then(function success(response) {
				vm.randomUser = response.data;
				console.log(vm.randomUser.avatar)
			});
	};
});

app.factory('RandomFactory', function($http) {
	return {
		getUser: getUser
	}
	function getUser() {
		return $http.get('/random');
	}
});