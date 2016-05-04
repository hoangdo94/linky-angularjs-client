'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('RegisterCtrl', function($rootScope, $scope, $location, usersService, notify) {
        $scope.signUpUser = function(data) {
            usersService.create(data, function(res) {
                if (res.error) {
                    var alert = '';
                    if (res.error.errors.email) {
                        alert += '\n' + res.error.errors.email[0];
                    }
                    if (res.error.errors.username) {
                        alert += '\n' + res.error.errors.username[0];
                    }
                    if (res.error.errors.password) {
                        alert += '\n' + res.error.errors.password[0];
                    }
                    if (res.error.errors.website) {
                        alert += '\n' + res.error.errors.website[0];
                    }

                    notify({
                        message: alert,
                        duration: 5000,
                        position: 'center'
                    });
                } else {
                  var welcome = 'Welcome to Linky! Good luck, have fun!';
                    notify({
                        message: welcome,
                        duration: 5000,
                        position: 'center'
                    });
                    $location.path('/');
                }
            });
        };

        $scope.goToLogin = function() {
            $location.path('/login');
        };
    });