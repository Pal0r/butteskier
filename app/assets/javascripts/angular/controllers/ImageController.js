angular.module('app').controller("ImageController",
  ['$location', '$scope', 'AuthService', 'instagramFactory',
  function ($location, $scope, AuthService, instagramFactory) {
	  if(!AuthService.isLoggedIn()){
	      AuthService.setPageTryingToAccess();
	      return $location.path('/sign_in');
	    }
	    // Hide the ui-view blur background
	    $scope.hideBackground = false;
	    instagramFactory.getImages().then(function(response){
	    	$scope.images = response.data
	    });
}]);
