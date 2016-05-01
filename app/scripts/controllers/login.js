'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $location, $timeout, authService) {
    $scope.username = null;
    $scope.password = null;
    $scope.message = null;

    $scope.doLogin = function() {
      authService.login($scope.username, $scope.password, function(isLoggedIn, user) {
        if (isLoggedIn) {
          $rootScope.currentUser = user;
          $location.path('/');
        } else {
          $scope.message = 'Failed to log in. Please try again.';
          $timeout(function() {
            $scope.message = null;
          }, 1000);
        }
      });
    };
  });
