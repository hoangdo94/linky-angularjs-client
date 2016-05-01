'use strict';

/**
 * @ngdoc service
 * @name linkyApp.followsService
 * @description
 * # followsService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('followsService', function ($http, $rootScope) {
    return {
            getFollowers: function(callback) {
            	$http.get($rootScope.apiUrl + '/follows?type=1')
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
            getFollowings: function(callback) {
                $http.get($rootScope.apiUrl + '/follows?type=2')
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
