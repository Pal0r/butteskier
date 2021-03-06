app = angular.module('app', [
  'ui.router',   //angular-ui-router
  'templates',   //angular-rails-templates
  'ngCookies'  ,  //angular-cookies
  'uiGmapgoogle-maps', //angular-gmaps
  'formly', //angular forms
  'formlyBootstrap',
  'angular-skycons', //Icons for area weather
  'lr.upload', // User image upload
  'ui.calendar', // event calendar
  'ui.bootstrap.datetimepicker',
  'slick' // Carousel
  ]);

$(document).ready(function(){
  if (!$('body').hasClass('ng-scope'))
    angular.bootstrap(document.body, ['app'])
});

app.value('urlToGoToAfterLogin', {url: '/'});

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sceDelegateProvider){
    // Whitelist external links
    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    'https://www.instagram.com/**',
    'http://photos-f.ak.instagram.com/**'
  ]);

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
      .state('editUserState',{
        url: '/edit_user',
        templateUrl: 'registrations/edit.html',
        controller : 'EditUserController'
      })
      // Meet ups
      .state('eventState',{
        url: '/meetup',
        templateUrl: 'events/events.html',
        controller: 'EventController'
      })
      .state('eventDetailState',{
        url: '/meetup/detail/:eventID',
        templateUrl: 'events/detail.html',
        controller: 'EventDetailController'
      })
      // About Butte Skier page
      .state('aboutState',{
        url: '/about',
        templateUrl: 'about.html',
        controller: 'AboutController'
      })
      // Instagram display page
      .state('imageState',{
        url: '/images',
        templateUrl: 'images/images.html',
        controller: 'ImageController'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
