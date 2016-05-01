'use strict';

/**
 * @ngdoc service
 * @name linkyApp.typesService
 * @description
 * # typesService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('typesService', function ($rootScope, $http) {
    return {
      getList: function (callback) {
        $http.get($rootScope.apiUrl + '/types')
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
