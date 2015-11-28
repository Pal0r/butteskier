angular.module('app').controller("AreaController",
    ['$location', '$scope', 'AuthService', '$stateParams', 'areaFactory', 'weatherFactory', '$timeout', '$http',
      function ($location, $scope, AuthService, $stateParams, areaFactory, weatherFactory, $timeout, $http){
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
        $scope.getAreaWeather = function(){
          weatherFactory.getWeather(areaId).then(function(response){
            $scope.weather = response.data;
          })
        };

        $scope.imageToggle = function(area, imageIndex){
          angular.forEach(area.grams, function(img){
            img.visible = false;
          });
          area.grams[imageIndex].visible = true;
        };
        $scope.deleteReport = function(report_id, reportIndex){
          $http.delete('/v1/reports/' + report_id)
            .success(function(response){
              $scope.area.reports.splice(reportIndex, 1);
            })
        };
        // TODO: This has not been enabled in the view
        $scope.deleteRun = function(run_id, runIndex){
          $http.delete('/v1/runs/' + run_id)
            .success(function(){
              $scope.area.runs.splice(runIndex, 1);
            })
        };
      }
    ]);
