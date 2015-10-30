angular.module('app').directive('createReport',['$stateParams', '$http', 'runFactory', function($stateParams, $http, runFactory){
  return{
    restrict: 'A',
    replace: true,
    scope: false,
    templateUrl: 'create_report_form.html',
    link: function(scope){
      scope.reportFormData = {
        areaID: $stateParams.areaID
      };
      scope.submitReport = function(){
        $http.post('/v1/reports', scope.reportFormData)
          .success(function(response){
            scope.area.reports.unshift(response.report);
            // Reset the form after submit.
            scope.reportFormData = {}
          })
      };
      // Add area runs to the select field options
      runFactory.getAreaRuns($stateParams.areaID).then(function(response){
        var options = [];
        angular.forEach(response.data, function(run){
          options.push({value: run.id, name: run.name})
        });
        var selectField = {
          key: 'runs',
          type: 'select',
          templateOptions: {
            label: 'Run',
            options: options,
            Placeholder: 'Create a run'
          }
        };
        // Wait for promise event before adding response data
        scope.reportFields.unshift(selectField);
      });
      scope.reportFields = [
        {
          key: 'new_snow',
          type: 'input',
          templateOptions: {
            label: "How much did it snow?",
            placeholder: "In inches"
          }
        },
        {
          key: 'quality',
          type: 'input',
          templateOptions: {
            label: "Snow Quality",
            placeholder: "Powder?"
          }
        },
        {
          key: 'avalanche',
          type: 'checkbox',
          templateOptions: {
            label: "Did you observe any signs of an avalanche?"
          }
        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: "Tell us about the snow!",
            placeholder: 'Describe the conditions. Was it soft? Avy danger?'
          }
        }
      ];
    }
  }
}]);