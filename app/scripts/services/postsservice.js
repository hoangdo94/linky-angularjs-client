'use strict';

/**
 * @ngdoc service
 * @name linkyApp.postsservice
 * @description
 * # postsservice
 * Service in the linkyApp.
 */
angular.module('linkyApp')
    .factory('postsService', function($rootScope, $http) {

        return {
            getUserPost: function(callback) {
            	$http.get($rootScope.apiUrl + '/posts?user_id=' + $rootScope.currentUser.id)
                    .success(function(data) {
                        if (callback) {
                            callback(data);
                        }
                    })
                    .error(function() {
                        if (callback) {
                            callback([]);
                        }
                    });
            },
            getList: function(callback) {
                $http.get($rootScope.apiUrl + '/posts')
                    .success(function(data) {
                        if (callback) {
                            callback(data);
                        }
                    })
                    .error(function() {
                        if (callback) {
                            callback([]);
                        }
                    });
            }
        };
    });