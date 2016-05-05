'use strict';

/**
 * @ngdoc service
 * @name linkyApp.commentsService
 * @description
 * # commentsService
 * Service in the linkyApp.
 */
angular.module('linkyApp')
    .factory('commentsService', function($http, $rootScope) {
        return {
            getComment: function(postId, callback) {
                $http.get($rootScope.apiUrl + '/comments?id=' + postId)
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
            commentPost: function(postId, content, callback) {
                $http.post($rootScope.apiUrl + '/comments', {
                    'post_id': postId,
                    'content': content
                })
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