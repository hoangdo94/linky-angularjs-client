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
      getAll: function (callback) {
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
      },
      getList: function (page, perPage, callback) {
        $http.get($rootScope.apiUrl + '/types?page=' + page + '&perPage=' + perPage)
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
        $http.post($rootScope.apiUrl + '/types', data)
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
        $http.post($rootScope.apiUrl + '/types/' + id, data)
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
        $http.delete($rootScope.apiUrl + '/types/' + id)
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
