webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

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

/***/ })

},[2]);