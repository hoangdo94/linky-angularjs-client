'use strict';

/**
 * @ngdoc service
 * @name linkyApp.usersService
 * @description
 * # usersService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('usersService', function ($rootScope, $http) {

    return {
      getList: function (callback) {
        $http.get($rootScope.apiUrl + '/users')
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
      get: function(id, callback) {
        $http.get($rootScope.apiUrl + '/users/' + id)
          .success(function(data) {
            if (callback) {
              callback(data);
            }
          })
          .error(function() {
            if (callback) {
              callback({});
            }
          });
      },
      create: function(data, callback) {
        $http.post($rootScope.apiUrl + '/users', data)
          .success(function(result) {
            if (callback) {
              callback(result);
            }
          })
          .error(function(result) {
            if (callback) {
              callback(result);
            }
          });
      },
      update: function(id, data, callback) {
        $http.post($rootScope.apiUrl + '/users/' + id, data)
          .success(function(result) {
            if (callback) {
              callback(result);
            }
          })
          .error(function(result) {
            if (callback) {
              callback(result);
            }
          });
      }
    };
  });
