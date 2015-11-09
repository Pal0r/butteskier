angular.module('app').controller("MeetupController",
  ['$location', '$scope', 'AuthService',
  function ($location, $scope, AuthService) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    $scope.user = AuthService.user
}]);

