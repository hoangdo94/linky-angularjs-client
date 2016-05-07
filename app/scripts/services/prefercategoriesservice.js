'use strict';

/**
 * @ngdoc service
 * @name linkyApp.prefercategoriesService
 * @description
 * # prefercategoriesService
 * Service in the linkyApp.
 */
angular.module('linkyApp')
    .factory('prefercategoriesService', function($rootScope, $http) {
        return {
            getUserPreferCategories: function(callback) {
                $http.get($rootScope.apiUrl + '/prefer_categories')
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
            updateUserPreferCategories: function(categories, callback) {
                $http.post($rootScope.apiUrl + '/prefer_categories', categories)
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