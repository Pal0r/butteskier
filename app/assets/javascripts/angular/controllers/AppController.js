angular.module('app').controller("AppController",
  ['$location', '$scope', 'AuthService', '$state', '$window', 'Restangular',
  function ($location, $scope, AuthService, $state, $window, Restangular) {
	$scope.user = {}
	$scope.user.isLoggedIn = AuthService.isLoggedIn();
    $scope.area = Restangular.one('areas').get().$object;

  $scope.logout = function () {
    AuthService.logout(
      function(res) {
        $scope.user.isLoggedIn = false;
    	  //ui-router is has some issues with reloading
    	  //the state if it's already in the same state
    	  //so we'll have to reload the page until it's
    	  //fixed.
        $state.go('homeState');
	      $window.location.reload();
      },
      function(err) {
        $scope.error = "Failed to logout";
      }
    );
  }
}]);
