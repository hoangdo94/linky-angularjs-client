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
      upload: function(file, callback) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post($rootScope.apiUrl + '/files', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
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
      }
    };
  });
