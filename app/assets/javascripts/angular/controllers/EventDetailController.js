angular.module('app').controller("EventDetailController",
  ['$scope', 'AuthService', '$stateParams', '$http', '$location', 'areaFactory',
  function ($scope, AuthService, $stateParams, $http, $location, areaFactory) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    $scope.current_user = AuthService.user;
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
    $scope.leaveEvent = function(event_id, userIndex){
      $http.delete('/v1/attendence/' + event_id)
      .success(function(response){
        $scope.event.attendence.splice(userIndex, 1)
      })
    }
}]);
