angular.module('app').directive('createRun',['$stateParams', '$http', function($stateParams, $http){
  return{
    restrict: 'A',
    replace: true,
    scope: false,
    templateUrl: 'create_run_form.html',
    link: function(scope){
      var areaID = $stateParams.areaID;
      scope.RunFormData = {
        areaID: areaID
      };
      scope.submitRun = function(){
        scope.runFormData['area_id'] = areaID;
        $http.post('/v1/runs', scope.runFormData)
          .success(function(response){
            scope.area.runs.unshift(response.run);
            // Reset the form after submit.
            scope.runFormData = {}
          })
      };
      scope.runFields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: "What's this line called?",
            placeholder: "Example: NW Bowl"
          }
        },
        {
          key: 'description',
          type: 'textarea',
          templateOptions: {
            label: "What's it like",
            placeholder: "Be descriptive here. Terrain, aspect, best approach, best conditions to visit, etc."
          }
        }
      ];
    }
  }
}]);