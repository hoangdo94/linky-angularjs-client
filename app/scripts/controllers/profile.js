'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $location, usersService, postsService, followsService) {
    $scope.profileUser = {};
    var userId = parseInt($routeParams.userId);
    usersService.get(userId, function(user) {
      if (user.id !== userId) {
        $location.path('/');
      }
      $scope.profileUser = user;
    });

    $scope.categories = ['Feeds', 'Followers', 'Following'];

    postsService.getUserPost(userId, function(posts) {
      $scope.feeds = posts;
    });

    followsService.getFollowers(function(followers) {
      $scope.followers = followers;
    });

    followsService.getFollowings(function(followings) {
      $scope.followings = followings;
    });

    // filter
    $scope.filterValue = 'Feeds';
    $scope.shown = 'Feeds';

    $scope.filter = function(cat) {
      $scope.filterValue = cat;
      if (cat==='Feeds') {
        $scope.shown = 'Feeds';
      }
      else if (cat==='Followers') {
        $scope.shown = 'Followers';
      }
      else if (cat==='Following') {
        $scope.shown = 'Following';
      }
    };
  });
