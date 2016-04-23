'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('RegisterCtrl', function ($scope, $window, $location, localStorageService) {
  	$scope.apiUrl = localStorageService.get('apiUrl');

    $scope.signUp = function(form) {
    	console.dir(form);
    	// TO-DO
    	// api-to-save-user
    	
    };

    $scope.goToLogin = function() {
    	$location.path('/login');
    };
  });
