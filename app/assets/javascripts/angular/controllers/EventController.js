angular.module('app').controller("EventController",
  ['$scope', 'AuthService', 'areaFactory', '$http', '$location',
  function ($scope, AuthService, areaFactory, $http, $location) {
    // Hide the ui-view blur background
    $scope.hideBackground = false;
    $scope.user = AuthService.user
    $scope.eventFormData = {}

    $scope.submitEvent = function(){
      // Set the user's id in the form data
      $scope.eventFormData.user_id = $scope.user.id
      $http.post('/v1/events', $scope.eventFormData)
        .success(function(response){
          $scope.events.unshift(response.event)
          // Clear form on success
          $scope.eventFormData = {}
        })
    }
    $scope.deleteEvent = function(event_id, eventIndex){
      $http.delete('/v1/events/' + event_id)
        .success(function(response){
          $scope.events.splice(eventIndex, 1)
        })
    };
    $scope.addUser = function(event_id){
      $http.post('/v1/attendence/',{'id': event_id})
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
        key: 'title',
        type: 'input',
        templateOptions: {
          label: 'Mission',
          placeholder: "Shreding? Millage?"
        }
      },
      {
        key: 'agenda',
        type: 'textarea',
        templateOptions: {
          label: 'Agenda',
          placeholder: "What's the plan?"
        }
      }
    ];
    $scope.onEventClick = function( event, jsEvent, view){
        return $location.path('/meetup/detail/' + event.id)
    };

    // Calendar Config
    $scope.uiConfig = {
      calendar:{
        height: 600,
        editable: true,
        header:{
          left: 'title',
          right: 'agendaDay, month, prev,next'
        },
        eventClick: $scope.onEventClick
      }
    };
    $scope.events = [];
    $scope.eventSources = [$scope.events];
    // Populate Events
    $http.get('/v1/events')
    .then(function(response){
      // Convert json rb datetime rep to js data obj
      angular.forEach(response.data, function(event){
        event['start'] = new Date(event.start)
        $scope.events.push(event)
      })

    })

}]);
