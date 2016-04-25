'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('RegisterCtrl', function ($scope, $window, $location, $http, localStorageService, UserData) {
  	$scope.apiUrl = localStorageService.get('apiUrl');

    $scope.signUp = function(form) {
    	// TO-DO
    	// api-to-save-user
      $http.post($scope.apiUrl + '/users', form)
        .success(function(response) {
          // Register to UserData
          UserData.register(response);
          
          // Redirect to main page
          $location.path('/');
        })
        .error(function(error) {
        }); 
    };

    $scope.goToLogin = function() {
    	$location.path('/login');
    };
  });
