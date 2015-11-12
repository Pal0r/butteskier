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
	    	$scope.areas = response.data
	    	// directive callback needs to wait until images are loaded
	    	$scope.dataLoaded = true;
	    });
      // For large image show event
      $scope.showDisplay = function(areaIndex, imageIndex){
        $scope.displayImage = true;
        var image = $scope.areas[areaIndex]['images'][imageIndex],
        instagramUser = image['instagram_json']['instagram_json']['user'];

        $scope.showImgSrc = image.standard_resolution_url;
        $scope.instaUser = {
          username: instagramUser['username'],
          userProfileImg: instagramUser['profile_picture']
        }
      }
    // Triggered on mouseout
      $scope.closeDisplay = function(){
        $scope.displayImage = false;
      }
}]);
