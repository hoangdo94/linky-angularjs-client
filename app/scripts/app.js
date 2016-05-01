/*globals $:false */
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
    'ngTouch',
    'LocalStorageModule',
    'isteven-multi-select'
  ])
  .config(function($routeProvider, localStorageServiceProvider) {
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
      .when('/setting/:userId', {
        templateUrl: 'views/setting.html',
        controller: 'SettingCtrl',
        controllerAs: 'setting'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });

      localStorageServiceProvider.setPrefix('linky');
  })
  .run(function(
    $rootScope,
    $location,
    authService
  ) {
    $rootScope.apiUrl = 'http://localhost:3000/api';
    $rootScope.viewMode = 'list';
    $rootScope.notInLoginScreen = false;
    $rootScope.authInited = false;

    $rootScope.$on( '$routeChangeStart', function() {
      $('#details-modal').modal('hide');
    });
    $rootScope.$on('$routeChangeSuccess', function(scope, current) {
      if (current.$$route) {
        $rootScope.notInLoginScreen = current.$$route.originalPath !== '/login' && current.$$route.originalPath !== '/register';
        if ($rootScope.notInLoginScreen && $rootScope.authInited && !authService.isLoggedIn()) {
          $location.path('/login');
        }
        if (!$rootScope.notInLoginScreen && $rootScope.authInited && authService.isLoggedIn()) {
          console.log('redirect to main');
          $location.path('/');
        }
      }
    });
    $rootScope.typeIconClass = function(type) {
      if (type === 'article') {
        return 'fa fa-newspaper-o';
      }
      if (type === 'video') {
        return 'fa fa-video-camera';
      }
      return 'fa fa-picture-o';
    };
    // details
    $rootScope.showDetails = function(feed) {
      $rootScope.current = feed;
    };
    // Init auth
    authService.init(function(isLoggedIn, user) {
      $rootScope.authInited = true;
      if (isLoggedIn) {
        $rootScope.currentUser = user;
      } else {
        $location.path('/login');
      }
    });
    $rootScope.isLoggedIn = authService.isLoggedIn;
    $rootScope.logout = authService.logout;
  })
  .controller('linkyCtrl', function() {
    
  });
