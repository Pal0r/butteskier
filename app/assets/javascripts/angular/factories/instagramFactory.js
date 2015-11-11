angular.module('app')
.factory('instagramFactory', 
  ['$http', 'areaFactory',
  function($http, areaFactory){
    var instagramFactory = {},
      areaBase = '/v1/areas/';

    instagramFactory.getImages = function(){
      return $http.get('/v1/images')
    }

    return instagramFactory
  }])
