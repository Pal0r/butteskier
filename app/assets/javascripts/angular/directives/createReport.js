angular.module('app').directive('createReport',['$stateParams', '$http', function($stateParams, $http){
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