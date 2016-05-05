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
      },
      update: function(id, data, callback) {
        $http.post($rootScope.apiUrl + '/categories/' + id, data)
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
        $http.delete($rootScope.apiUrl + '/categories/' + id)
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
