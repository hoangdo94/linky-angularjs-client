'use strict';

/**
 * @ngdoc directive
 * @name linkyApp.directive:pwRecheck
 * @description
 * # pwRecheck
 */
angular.module('linkyApp')
  .directive('pwRecheck', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                var noMatch = viewValue !== scope.form_user.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            });
        }
    };
  });
