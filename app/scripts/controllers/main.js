'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('MainCtrl', function($rootScope, $scope, categoriesService, postsService,metaService) {

    function isUrl(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }

    categoriesService.getList(function(categories) {
      $scope.categories = categories;
      $scope.preferredCategories = $scope.categories.slice(0, 3);
      $scope.otherCategories = $scope.categories.slice(3, $scope.categories.length);
    });

    postsService.getList(function(posts) {
      $scope.feeds = posts;
      $scope.shown = posts;
    });

    $scope.link = '';
    $scope.isMetaShown = false;
    $scope.isMetaLoading = true;
    $scope.metadata = null;
    $scope.isFormShown = false;
    $scope.moreCategoriesText = 'More...';


    // filter
    $scope.filterValue = 'All';
    // $scope.shown = $scope.feeds;

    $scope.filter = function(cat, isOther) {
      if (isOther) {
        $scope.filterValue = 'Other';
        $scope.moreCategoriesText = cat.name;
      } else {
        $scope.filterValue = cat;
        $scope.moreCategoriesText = 'More...';
      }

      if (cat === 'All') {
        $scope.shown = $scope.feeds;
      } else {
        $scope.shown = $scope.feeds.filter(function(f) {
          return f.cate_name === cat.name;
        });
      }
    };

    // view mode
    $scope.setViewMode = function(mode) {
      $rootScope.viewMode = mode;
    };

    // share link
    $scope.showForm = function() {
      if (isUrl($scope.link)) {
        $scope.isMetaShown = true;
        $scope.isFormShown = false;
        $scope.isMetaLoading = true;
        var link = $scope.link;
        metaService.getLinkMeta(link, function(metadata) {
          $scope.isMetaLoading = false;
          $scope.isFormShown = true;
          if (metadata && link === $scope.link) {
            $scope.metadata = metadata;
          }
        });
      } else {
        $scope.isFormShown = false;
      }
    };
    $scope.hideForm = function() {
      $scope.link = '';
      $scope.isFormShown = false;
    };

  });
