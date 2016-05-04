'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('RegisterCtrl', function ($rootScope, $scope, $location) {
    $scope.signUpUser = function(data) {
    	console.dir(data);
    };

    $scope.goToLogin = function() {
    	$location.path('/login');
    };
  });
