angular.module('app')
  .factory('runFactory', ['$http',
    function($http){
      var runFactory = {}

      runFactory.getAreaRuns = function(area_id){
        return $http.get('/v1/runs/' + area_id)
      };

      return runFactory
    }])
