angular.module('app').controller("AppController",
  ['$location', '$scope', 'AuthService', '$state', '$window', 'areaFactory',
  function ($location, $scope, AuthService, $state, $window, areaFactory) {
	  $scope.user = {};
      var authService = AuthService;
      $scope.user.isLoggedIn = authService.isLoggedIn();
      $scope.userName = authService.user.username;

     areaFactory.getAreas().then(function(res){
        $scope.areas = res.data;
      });

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
