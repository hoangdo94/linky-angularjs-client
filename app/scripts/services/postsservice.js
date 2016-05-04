'use strict';

/**
 * @ngdoc service
 * @name linkyApp.postsservice
 * @description
 * # postsservice
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
    .factory('postsService', function($rootScope, $http) {

        return {
            getUserPost: function(userId, callback) {
            	$http.get($rootScope.apiUrl + '/posts?user_id=' + userId)
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