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
      getAll: function (callback) {
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
      getList: function (page, perPage, callback) {
        $http.get($rootScope.apiUrl + '/categories?page=' + page + '&perPage=' + perPage)
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
      insert: function(data, callback) {
        $http.post($rootScope.apiUrl + '/categories', data)
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
        $http.post($rootScope.apiUrl + '/categories/' + id, data)
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
