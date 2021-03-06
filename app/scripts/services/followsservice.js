'use strict';

/**
 * @ngdoc service
 * @name linkyApp.followsService
 * @description
 * # followsService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
    .factory('followsService', function($http, $rootScope) {
        return {
            getFollowers: function(userId, page, perPage, callback) {
                $http.get($rootScope.apiUrl + '/follows?type=1' + '&user_id=' + userId + '&page=' + page + '&perPage=' + perPage)
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
            getFollowings: function(userId, page, perPage, callback) {
                $http.get($rootScope.apiUrl + '/follows?type=2' + '&user_id=' + userId + '&page=' + page + '&perPage=' + perPage)
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
            followUser: function(userId, callback) {
                $http.post($rootScope.apiUrl + '/follows', {
                    'id': userId
                })
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
            unfollowUser: function(userId, callback) {
                $http.delete($rootScope.apiUrl + '/follows/' + userId)
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
            isFollowing: function(userId, callback) {
                $http.get($rootScope.apiUrl + '/follows/check/' + userId)
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
