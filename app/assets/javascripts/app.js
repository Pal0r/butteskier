app = angular.module('app', [
  'ui.router',   //angular-ui-router
  'templates',   //angular-rails-templates
  'restangular', //restangular
  'ngCookies'  ,  //angular-cookies
  'uiGmapgoogle-maps' //angular-gmaps
  ]);

$(document).ready(function(){
  if (!$('body').hasClass('ng-scope'))
    angular.bootstrap(document.body, ['app'])
});

app.value('urlToGoToAfterLogin', {url: '/'});

app.config(['$stateProvider','$urlRouterProvider',
            '$locationProvider', '$httpProvider',
            'RestangularProvider', 'uiGmapGoogleMapApiProvider',
  function($stateProvider, $urlRouterProvider,
           $locationProvider, $httpProvider,
           RestangularProvider, uiGmapGoogleMapApiProvider){

    //unmatched routes redirect to root
    $urlRouterProvider.otherwise("/");

    //set up states and routing
    $stateProvider
      .state('homeState',{
        url: '/',
        templateUrl: 'index.html',
		controller: 'AppController'
      })
        .state('areaState',{
            url: '/area/:areaID',
            templateUrl: 'areas/area.html',
            controller: 'AreaController'
        })
      //auth
      .state('loginState',{
        url: '/sign_in',
        templateUrl: 'sessions/new.html',
        controller : 'LoginController'
      })
      .state('signUpState',{
        url: '/sign_up',
        templateUrl: 'registrations/new.html',
        controller : 'SignUpController'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    //restangular settings
    RestangularProvider.setBaseUrl('/v1');

      //Google maps config
      // TODO: move api key to secrets
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCdWNoKkcsduyENQ6yuY0InZj96ToJN2Ho',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
     });
  }]);
