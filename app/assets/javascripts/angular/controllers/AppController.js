angular.module('app').controller("AppController",
  ['$location', '$scope', 'AuthService', '$state', '$window', 'Restangular',
  function ($location, $scope, AuthService, $state, $window, Restangular) {
	  $scope.user = {};
      var authService = AuthService;
      $scope.user.isLoggedIn = authService.isLoggedIn();
      $scope.userName = authService.user.username;


      // Gets obj repr of the areaList for the sidenav
      $scope.areas = Restangular.all('areas').getList().$object;

      // Hide the ui-view blur background
      $scope.hideBackground = true;

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
