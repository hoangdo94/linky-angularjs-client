'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('LoginCtrl', function($scope, UserData) {
        $scope.login = function(user) {
            // TO-DO
            // api-to-validate-user

            UserData.setCurrentUser(user);
        };
    });