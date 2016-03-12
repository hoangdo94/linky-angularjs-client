'use strict';

/**
 * @ngdoc overview
 * @name linkyApp
 * @description
 * # linkyApp
 *
 * Main module of the application.
 */
angular
  .module('linkyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/profile-edit/:userId', {
        templateUrl: 'views/profile-edit.html',
        controller: 'ProfileEditCtrl',
        controllerAs: 'profileEdit'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
