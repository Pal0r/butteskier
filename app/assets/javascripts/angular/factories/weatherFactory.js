angular.module('app')
  .factory('weatherFactory', ['$http',
    function($http){
      var weatherFactory = {},
        weatherBase = '/v1/weather/';

      // Returns the most recent weather observation
      weatherFactory.getWeather = function(area_id){
        return $http.get(weatherBase + area_id)
      };

      return weatherFactory
    }])