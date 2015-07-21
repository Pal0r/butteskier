angular.module('app')
.factory('areaFactory', ['$http',
  function($http){
    var areaFactory = {},
      areaBase = '/v1/areas/',
      weatherBase = '/v1/weather/';


    areaFactory.getAreaDetail = function(area_id){
      return $http.get(areaBase + area_id)
    };

    areaFactory.getAreas = function(){
      return $http.get(areaBase)
    };

    areaFactory.getWeather = function(weather_id){
      return $http.get(weatherBase + weather_id)
    };

    return areaFactory
  }])
