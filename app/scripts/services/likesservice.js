'use strict';

/**
 * @ngdoc service
 * @name linkyApp.likesService
 * @description
 * # likesService
 * Service in the linkyApp.
 */
angular.module('linkyApp')
  .factory('likesService', function ($http, $rootScope) {
    return {
            likePost: function(postId, callback) {
            	$http.post($rootScope.apiUrl + '/likes?id=' + postId)
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
