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
            },
            createPost: function(post, callback) {
              $http.post($rootScope.apiUrl + '/posts', post)
                .success(function(data) {
                    if (callback) {
                        callback(data);
                    }
                })
                .error(function(err) {
                    if (callback) {
                        callback(err);
                    }
                });
            },
            update: function(id, data, callback) {
              $http.post($rootScope.apiUrl + '/posts/' + id, data)
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
            delete: function(id, callback) {
              $http.delete($rootScope.apiUrl + '/posts/' + id)
                .success(function(data) {
                  if (callback) {
                    callback(data);
                  }
                })
                .error(function(err) {
                  if (callback) {
                    callback(err);
                  }
                });
            }
        };
    });
