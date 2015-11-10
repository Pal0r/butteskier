angular.module('app').controller("EventDetailController",
  ['$scope', 'AuthService', '$stateParams', '$http', '$location', 'areaFactory',
  function ($scope, AuthService, $stateParams, $http, $location, areaFactory) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    // Get and set event data to the scope
    $http.get('/v1/events/' + $stateParams.eventID)
    .then(function(response){
      $scope.event = response.data
      var area_id = response.data.area_id
      areaFactory.getAreaDetail(area_id)
      .then(function(response){
        $scope.area = response.data
      })
    })
}]);

