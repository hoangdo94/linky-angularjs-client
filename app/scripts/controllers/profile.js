'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $location, usersService, postsService) {
    $scope.profileUser = {};
    var userId = parseInt($routeParams.userId);
    usersService.get(userId, function(user) {
      if (user.id !== userId) {
        $location.path('/');
      }
      $scope.profileUser = user;
    });

    $scope.categories = ['Feeds', 'Followers', 'Following'];

    postsService.getUserPost(function(posts) {
      console.dir(posts);
      $scope.feeds = posts;
    });
    
    $scope.followers = [
	    {id:1,user:'rmurray0',posts:513,followers:288,following:740},
	    {id:2,user:'cmartin1',posts:620,followers:288,following:474},
	    {id:3,user:'wlane2',posts:558,followers:524,following:182},
	    {id:4,user:'wpeters3',posts:635,followers:311,following:134},
	    {id:5,user:'pwhite4',posts:476,followers:284,following:583},
	    {id:6,user:'sgriffin5',posts:640,followers:813,following:768},
	    {id:7,user:'awalker6',posts:365,followers:999,following:256},
	    {id:8,user:'mburton7',posts:225,followers:157,following:150},
	    {id:9,user:'aolson8',posts:207,followers:808,following:571},
	    {id:10,user:'eray9',posts:396,followers:204,following:698},
	    {id:11,user:'lburnsa',posts:257,followers:222,following:788},
	    {id:12,user:'sturnerb',posts:412,followers:844,following:921},
	    {id:13,user:'bjohnstonc',posts:325,followers:359,following:917},
	    {id:14,user:'vriverad',posts:785,followers:880,following:759},
	    {id:15,user:'darmstronge',posts:668,followers:791,following:463},
	    {id:16,user:'lbrownf',posts:514,followers:810,following:162},
	    {id:17,user:'lfullerg',posts:811,followers:568,following:420},
	    {id:18,user:'sgrayh',posts:890,followers:696,following:231},
	    {id:19,user:'wfisheri',posts:382,followers:331,following:706},
	    {id:20,user:'hburnsj',posts:372,followers:169,following:559}
    ];
    $scope.following = [
	    {id:1,user:'cwells0',posts:159,followers:520,following:607},
	    {id:2,user:'afuller1',posts:714,followers:849,following:157},
	    {id:3,user:'jkelley2',posts:232,followers:440,following:811},
	    {id:4,user:'hjames3',posts:429,followers:384,following:167},
	    {id:5,user:'csmith4',posts:543,followers:260,following:624},
	    {id:6,user:'kramirez5',posts:657,followers:799,following:489},
	    {id:7,user:'dholmes6',posts:119,followers:350,following:103},
	    {id:8,user:'msimmons7',posts:504,followers:428,following:572},
	    {id:9,user:'dwilliams8',posts:304,followers:202,following:711},
	    {id:10,user:'fhernandez9',posts:345,followers:689,following:976},
	    {id:11,user:'nromeroa',posts:970,followers:743,following:565},
	    {id:12,user:'aschmidtb',posts:454,followers:483,following:489},
	    {id:13,user:'lrobinsonc',posts:138,followers:880,following:450},
	    {id:14,user:'rburtond',posts:615,followers:985,following:618},
	    {id:15,user:'ccooke',posts:679,followers:178,following:695},
	    {id:16,user:'lsimsf',posts:436,followers:172,following:214},
	    {id:17,user:'sandrewsg',posts:343,followers:647,following:395},
	    {id:18,user:'aarnoldh',posts:891,followers:908,following:813},
	    {id:19,user:'dgriffini',posts:742,followers:993,following:274},
	    {id:20,user:'crosej',posts:967,followers:764,following:431}
    ];


    $scope.current = {};

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
