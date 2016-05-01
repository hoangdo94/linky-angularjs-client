'use strict';

/**
 * @ngdoc service
 * @name linkyApp.categoriesService
 * @description
 * # categoriesService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('categoriesService', function ($rootScope, $http) {

    return {
      getList: function (callback) {
        $http.get($rootScope.apiUrl + '/categories')
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
