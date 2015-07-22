app = angular.module('app', [
  'ui.router',   //angular-ui-router
  'templates',   //angular-rails-templates
  'ngCookies'  ,  //angular-cookies
  'uiGmapgoogle-maps', //angular-gmaps
  'formly', //angular forms
  'formlyBootstrap'
  ]);

$(document).ready(function(){
  if (!$('body').hasClass('ng-scope'))
    angular.bootstrap(document.body, ['app'])
});

app.value('urlToGoToAfterLogin', {url: '/'});

app.config(['$stateProvider','$urlRouterProvider',
            '$locationProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider,
           $locationProvider, $httpProvider){

    //unmatched routes redirect to root
    $urlRouterProvider.otherwise("/");

    //set up states and routing
    $stateProvider
      .state('homeState',{
        url: '/',
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
  }]);
