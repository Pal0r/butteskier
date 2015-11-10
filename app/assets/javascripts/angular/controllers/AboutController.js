angular.module('app').controller("AboutController",
  ['$location', '$scope', 'AuthService',
  function ($location, $scope, AuthService) {
	  if(!AuthService.isLoggedIn()){
          AuthService.setPageTryingToAccess();
          return $location.path('/sign_in');
        }
        // Hide the ui-view blur background
        $scope.hideBackground = false;
}]);
