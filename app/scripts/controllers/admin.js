'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('AdminCtrl', function($scope, $routeParams, $location, $filter, categoriesService, postsService, typesService, usersService, notify) {
    $scope.entityTypes = ['categories', 'links', 'types', 'users'];
    $scope.iconClasses = ['fa-object-group', 'fa-newspaper-o', 'fa-table', 'fa-users'];
    if ($routeParams.entity) {
      $scope.entityType = $routeParams.entity.toLowerCase();
      if ($scope.entityTypes.indexOf($scope.entityType) === -1) {
        $location.path('/admin/' + $scope.entityTypes[0]);
      }
    } else {
      $scope.entityType = $scope.entityTypes[0];
    }

    var entityService = null;

    function getCategories() {
      categoriesService.getList(function(categories) {
        $scope.entities = categories;
      });
    }

    function getTypes() {
      typesService.getList(function(types) {
        types.forEach(function(type) {
          var s = type.name;
          type.name = s && s[0].toUpperCase() + s.slice(1);
        });
        $scope.entities = types;
      });
    }

    function getPosts() {
      postsService.getList(function(posts) {
        $scope.entities = posts;
      });
    }

    function getUsers() {
      usersService.getList(function(users) {
        $scope.entities = users;
      });
    }

    function fetchData() {
      switch ($scope.entityType) {
        case 'users':
          {
            entityService = usersService;
            $scope.fields = ['id', 'username', 'email', 'website', 'phone', 'title'];
            $scope.editables = ['website', 'phone', 'title'];
            $scope.addOrRemoveable = false;
            getUsers();
            break;
          }
        case 'links':
          {
            entityService = postsService;
            $scope.fields = ['id', 'user_id', 'cate_id', 'type_id', 'content'];
            $scope.editables = ['content'];
            $scope.addOrRemoveable = false;
            getPosts();
            break;
          }
        case 'types':
          {
            entityService = typesService;
            $scope.fields = ['id', 'name'];
            $scope.editables = ['name'];
            $scope.addOrRemoveable = true;
            getTypes();
            break;
          }
        default:
          {
            entityService = categoriesService;
            $scope.fields = ['id', 'name'];
            $scope.editables = ['name'];
            $scope.addOrRemoveable = true;
            getCategories();
            break;
          }
      }
    }

    fetchData();

    $scope.editData = {};

    $scope.startEdit = function(id) {
      var currentEntity = $filter('filter')($scope.entities, {
        id: id
      })[0];
      $scope.editData.id = id;
      $scope.editables.forEach(function(field) {
        $scope.editData[field] = currentEntity[field];
      });
    };

    $scope.finishEdit = function() {
      console.log($scope.editData);
      entityService.update($scope.editData.id, $scope.editData, function(res) {
        if (res.error) {
          var alert = '';
          var keys = Object.keys(res.error.errors);
          keys.forEach(function(key) {
            alert += '\n' + res.error.errors[key][0];
          });
          notify({
            message: alert,
            duration: 5000,
            position: 'center'
          });
        } else {
          fetchData();
          notify({
            message: 'Updated!',
            duration: 2000,
            position: 'center'
          });
        }
        $scope.editData = {};
      });
    };

    $scope.startDelete = function(id) {
        $scope.editData.id = id;
    };

    $scope.finishDelete = function() {
      entityService.delete($scope.editData.id, function(res) {
        if (res.error) {
          var alert = '';
          var keys = Object.keys(res.error.errors);
          keys.forEach(function(key) {
            alert += '\n' + res.error.errors[key][0];
          });
          notify({
            message: alert,
            duration: 5000,
            position: 'center'
          });
        } else {
          fetchData();
          notify({
            message: 'Deleted!',
            duration: 2000,
            position: 'center'
          });
        }
        $scope.editData = {};
      });
    };

  });
