'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('LoginCtrl', function($rootScope, $scope, $location, $timeout, authService, filesService, notify) {
        $scope.username = null;
        $scope.password = null;
        $scope.message = null;

        $scope.doLogin = function() {
            authService.login($scope.username, $scope.password, function(isLoggedIn, user) {
                if (isLoggedIn) {
                    $rootScope.currentUser = user;
                    if ($rootScope.currentUser.avatar_id) {
                        $rootScope.currentUser.avatar_url = $rootScope.apiUrl + '/files/' + $rootScope.currentUser.avatar_id;
                    } else {
                        $rootScope.currentUser.avatar_url = '/images/default/default_avatar.png';
                    }
                    $location.path('/');
                } else {
                    notify({
                        message: 'Failed to log in. Please try again!',
                        duration: '3000',
                        position: 'center'
                    });
                }
            });
        };

        $('#form-password').on('keypress', function(event) {
            if (event.which === 13 || event.keyCode === 13) {
                $('#login-btn').click();
            }
        });
    });