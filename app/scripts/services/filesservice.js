'use strict';

/**
 * @ngdoc service
 * @name linkyApp.filesService
 * @description
 * # filesService
 * Service in the linkyApp.
 */
angular.module('linkyApp')
    .factory('filesService', function($http, $rootScope) {
        return {
            upload: function(image, callback) {
                $http.post($rootScope.apiUrl + '/files', image, {
                    headers: {
                        'Content-Type': false,
                        'Mime-Type': 'multipart/form-data'
                    }
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