angular.module('app').controller("AreaController",
    ['$location', '$scope', 'Restangular', 'AuthService', '$stateParams', 'areaFactory',
      function ($location, $scope, Restangular, AuthService, $stateParams, areaFactory){
        if(!AuthService.isLoggedIn()){
          AuthService.setPageTryingToAccess();
          return $location.path('/sign_in');
        }
        // Hide the ui-view blur background
        $scope.hideBackground = false;

        // used for state change event when using the sidebar nav
        var areaId = $stateParams.areaID;

        areaFactory.getAreaDetail(areaId).then(function(response){
          $scope.area = response.data;

          // show main image on pageload
          angular.forEach($scope.area.grams, function(gram, index){
            if(index == 0){
              gram.visible = true;
            }
          })
        });

        $scope.imageToggle = function(area, imageIndex){
          angular.forEach(area.grams, function(img){
            img.visible = false;
          });
          area.grams[imageIndex].visible = true;
        };
      }
    ]);