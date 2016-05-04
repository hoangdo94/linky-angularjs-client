'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('MainCtrl', function($rootScope, $scope, categoriesService, typesService, postsService, metaService, notify) {

    function isUrl(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
    }

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
        $scope.feeds = posts;
        $scope.shown = posts;
      });
    }

    getCategories();
    getTypes();
    getPosts();

    $scope.newPost = {
      link: null,
      cate_id: null,
      type_id: null,
      meta_id: null,
      content: null
    };
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
      if (isUrl($scope.newPost.link)) {
        $scope.isMetaShown = true;
        $scope.isFormShown = false;
        $scope.isMetaLoading = true;
        var link = $scope.newPost.link;
        metaService.getLinkMeta(link, function(metadata) {
          $scope.isMetaLoading = false;
          $scope.isFormShown = true;
          if (metadata && link === $scope.newPost.link) {
            $scope.metadata = metadata;
            $scope.newPost.meta_id = metadata.id;
          }
        });
      } else {
        $scope.isFormShown = false;
      }
    };
    $scope.hideForm = function() {
      $scope.newPost.link = '';
      $scope.isFormShown = false;
    };
    $scope.submitPost = function() {
      if ($scope.newPost.cate_id && $scope.newPost.meta_id && $scope.newPost.type_id && $scope.newPost.content) {
        postsService.createPost($scope.newPost, function(result) {
          $scope.hideForm();
          $scope.metadata = null;
          $scope.newPost = {
            link: null,
            cate_id: null,
            type_id: null,
            meta_id: null,
            content: null
          };
          getPosts();
          if (result.error) {
            notify({
              message: 'Cannot share your link. Please try again later.',
              duration: 5000,
              position: 'center'
            });
          } else {
            notify({
              message: 'Your link is successfully shared :-)',
              duration: 5000,
              position: 'center'
            });
          }
        });
      }
    };

  });
