'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('LoginCtrl', function($scope, $http, $location, UserData, localStorageService) {
        $scope.apiUrl = localStorageService.get('apiUrl');
        $scope.showAlertLogin = false;

        $scope.loginUser = function(user) {
            // TO-DO
            // api-to-validate-user
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $scope.apiUrl + "/auth",
                "method": "POST",
                "headers": {
                    "authorization": "Basic " + btoa(user.username + ':' + user.password),
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache"
                }
            }

            $.ajax(settings)
                .success(function(response) {
                    UserData.setCurrentUser(response, function() {
                    	$location.path('/');
                    });
                })
                .error(function(xhr, textStatus, errorThrown) {
                	if (textStatus == 'error') {
                		$scope.showAlertLogin = true;
                		$scope.$apply();
                	}
                });
        };
    });