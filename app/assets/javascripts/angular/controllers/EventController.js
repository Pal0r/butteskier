angular.module('app').controller("EventController",
  ['$location', '$scope', 'AuthService',
  function ($location, $scope, AuthService) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    $scope.user = AuthService.user

    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: true,
        header:{
          left: 'title',
          right: 'agendaDay, month, prev,next'
        }
      }
    };

    $scope.events = [
      {title: 'All Day Event',start: new Date()},
      {title: 'Long Event',start: new Date(),end: new Date()},
      {id: 999,title: 'Repeating Event',start: new Date(),allDay: false}
    ];
    $scope.eventSources = [
      $scope.events
    ];
}]);

