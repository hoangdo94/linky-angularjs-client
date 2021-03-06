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
    $scope.currentPage = 1;
    $scope.perPage = '5';
    $scope.canNext = false;
    $scope.canPrev = false;
    $scope.from = 0;
    $scope.to = 0;
    $scope.total = 0;
    $scope.totalPages = 0;

    function updatePaginationInfo(res) {
      $scope.canNext = res.next_page_url !== null;
      $scope.canPrev = res.prev_page_url !== null;
      $scope.from = res.from;
      $scope.to = res.to;
      $scope.total = res.total;
      $scope.totalPages = Math.ceil($scope.total/$scope.perPage);
    }

    function getEntities() {
      entityService.getList($scope.currentPage, $scope.perPage, function(res) {
        updatePaginationInfo(res);
        if (res.data.length === 0 && $scope.canPrev) {
          $scope.goPrev();
        } else {
          $scope.entities = res.data;
        }
      });
    }

    function fetchData() {
      switch ($scope.entityType) {
        case 'users':
          {
            entityService = usersService;
            $scope.labels = ['Username', 'Email', 'Website', 'Phone', 'Title'];
            $scope.fields = ['username', 'email', 'website', 'phone', 'title'];
            $scope.editables = ['website', 'phone', 'title'];
            $scope.addOrRemoveable = false;
            break;
          }
        case 'links':
          {
            entityService = postsService;
            $scope.labels = ['User', 'Category', 'Type', 'Link', 'Content'];
            $scope.fields = ['username', 'cate_name', 'type_name', 'link', 'content'];
            $scope.editables = ['content'];
            $scope.addOrRemoveable = false;
            break;
          }
        case 'types':
          {
            entityService = typesService;
            $scope.labels = ['Name'];
            $scope.fields = ['name'];
            $scope.editables = ['name'];
            $scope.addOrRemoveable = true;
            break;
          }
        default:
          {
            entityService = categoriesService;
            $scope.labels = ['Name'];
            $scope.fields = ['name'];
            $scope.editables = ['name'];
            $scope.addOrRemoveable = true;
            break;
          }
      }
      getEntities();
    }

    fetchData();

    $scope.editData = {};
    $scope.addData = {};

    $scope.finishAdd = function() {
      entityService.insert($scope.addData, function(res) {
        if (res.error) {
          var alert = '';
          var keys = Object.keys(res.error.errors);
          keys.forEach(function(key) {
            alert += '\n' + res.error.errors[key][0];
          });
          notify({
            message: alert,
            duration: 2000,
            position: 'center'
          });
        } else {
          fetchData();
          notify({
            message: 'Added!',
            duration: 2000,
            position: 'center'
          });
        }
        $scope.addData = {};
      });
    };

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
      entityService.update($scope.editData.id, $scope.editData, function(res) {
        if (res.error) {
          var alert = '';
          var keys = Object.keys(res.error.errors);
          keys.forEach(function(key) {
            alert += '\n' + res.error.errors[key][0];
          });
          notify({
            message: alert,
            duration: 2000,
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
            duration: 2000,
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

    $scope.goNext = function() {
      if ($scope.canNext) {
        $scope.currentPage++;
        getEntities();
      }
    };

    $scope.goPrev = function() {
      if ($scope.canPrev) {
        $scope.currentPage--;
        getEntities();
      }
    };

    $scope.reload = function(perPage) {
      if (perPage) {
        $scope.perPage = perPage;
      }
      getEntities();
    };

  });
