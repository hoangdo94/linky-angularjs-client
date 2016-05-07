'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('ProfileCtrl', function($scope, $rootScope, $routeParams, $location, usersService, postsService, followsService) {
        $scope.profileUser = {};
        var userId = parseInt($routeParams.userId);
        usersService.get(userId, function(user) {
            if (user.id !== userId) {
                $location.path('/');
            }
            $scope.profileUser = user;
            console.log(user);
            if (user.website && user.website.length > 0 && user.email && user.email.length > 0) {
              $scope.showDelimiter = true;
            } else {
              $scope.showDelimiter = false;
            }
        });


        $scope.feeds = [];
        // pagination
        $scope.currentPostPage = 1;
        $scope.canLoadMorePosts = false;

        $scope.categories = ['Feeds', 'Followers', 'Following'];

        function getUserPosts() {
          postsService.getUserPost(userId, $scope.currentPage, 5 , function(res) {
              if (res.next_page_url) {
                $scope.canLoadMore = true;
              } else {
                $scope.canLoadMore = false;
              }
              res.data.forEach(function(post) {
                $scope.feeds.push(post);
              });

          });
        }

        followsService.getFollowers(userId, function(followers) {
            $scope.followers = followers;
        });

        followsService.getFollowings(userId, function(followings) {
            $scope.followings = followings;
        });

        // filter
        $scope.filterValue = 'Feeds';
        $scope.shown = 'Feeds';

        $scope.filter = function(cat) {
            $scope.filterValue = cat;
            if (cat === 'Feeds') {
                $scope.shown = 'Feeds';
            } else if (cat === 'Followers') {
                $scope.shown = 'Followers';
            } else if (cat === 'Following') {
                $scope.shown = 'Following';
            }
        };

        // pagination
        $scope.loadMorePosts = function() {
          $scope.currentPostPage ++;
          getUserPosts();
        };

        getUserPosts();
    });
