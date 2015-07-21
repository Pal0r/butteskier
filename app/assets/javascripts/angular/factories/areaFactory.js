angular.module('app')
.factory('areaFactory', ['$http',
  function($http){
    var areaFactory = {};
    var baseUrl = '/v1/areas/';

    areaFactory.getAreaDetail = function(area_id){
      return $http.get(baseUrl + area_id)
    };

    areaFactory.getAreas = function(){
      return $http.get(baseUrl)
    };

    return areaFactory
  }])
