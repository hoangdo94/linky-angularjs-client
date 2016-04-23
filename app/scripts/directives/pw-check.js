'use strict';

/**
 * @ngdoc directive
 * @name linkyApp.directive:pwCheck
 * @description
 * # pwCheck
 */
angular.module('linkyApp')
  .directive('pwCheck', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue !== scope.form_user.password.$viewValue;
                ctrl.$setValidity('noMatch', !noMatch);
            })
        }
    }
  });
