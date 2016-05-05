'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('AdminCtrl', function ($scope, $routeParams, $location, categoriesService, postsService, typesService, usersService) {
    $scope.entities = ['categories', 'posts', 'types', 'users'];
    $scope.iconClasses = ['fa-object-group', 'fa-newspaper-o', 'fa-table', 'fa-users'];
    if ($routeParams.entity) {
      $scope.entity = $routeParams.entity.toLowerCase();
      if ($scope.entities.indexOf($scope.entity) === -1) {
        $location.path('/admin/' + $scope.entities[0]);
      }
    } else {
      $scope.entity = $scope.entities[0];
    }
    console.log($scope.entity);
    function getCategories() {
      categoriesService.getList(function(categories) {
        $scope.categories = categories;
        $scope.preferredCategories = $scope.categories.slice(0, 3);
        $scope.otherCategories = $scope.categories.slice(3, $scope.categories.length);
      });
    }

    function getTypes() {
      typesService.getList(function(types) {
        types.forEach(function(type) {
          var s = type.name;
          type.name = s && s[0].toUpperCase() + s.slice(1);
        });
        $scope.types = types;
      });
    }

    function getPosts() {
      postsService.getList(function(posts) {
        $scope.posts = posts;
      });
    }

    function getUsers() {
      usersService.getList(function(users) {
        $scope.users = users;
      });
    }

    switch ($scope.entity) {
      case 'users': {
        getUsers();
        break;
      }
      case 'posts': {
        getPosts();
        break;
      }
      case 'types': {
        getTypes();
        break;
      }
      default: {
        getCategories();
        break;
      }
    }
  });
