angular.module('app').controller("EventController",
  ['$location', '$scope', 'AuthService', 'areaFactory',
  function ($location, $scope, AuthService, areaFactory) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    $scope.user = AuthService.user
    $scope.eventFormData = {}
    $scope.submitEvent = function(){
      console.log($scope.eventFormData)
      // Clear form on success
      $scope.eventFormData = {}
    }
    areaFactory.getAreas().then(function(response){
      var options = [];
      angular.forEach(response.data, function(area){
          options.push({value: area.id, name: area.name})
        });
      var selectField = {
        key: 'area_id',
        type: 'select',
        templateOptions: {
          label: 'Area',
          options: options,
          Placeholder: 'Select an area'
        }
      };
      // Wait for promise event before adding response data
      $scope.eventFields.unshift(selectField);
    })
    $scope.eventFields = [
        {
          key: 'agenda',
          type: 'textarea',
          templateOptions: {
            label: 'Agenda',
            placeholder: "What's the plan?"
          }
        }
      ];


    // Calendar Config
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

