'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.categories = ['Technology', 'Photography', 'Life', 'Ecomomy'];
  });
