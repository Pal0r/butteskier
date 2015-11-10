angular.module('app').controller("LoginController",
  ['$location', '$scope', 'AuthService', 'urlToGoToAfterLogin',
  function ($location, $scope, AuthService, urlToGoToAfterLogin) {
    if(AuthService.isLoggedIn()){
      return $location.path('/');
    }
      // Hide the ui-view blur background
      $scope.hideBackground = false;
    
    $scope.login = function () {
      var credentials = {
        user: {
          email: $scope.email,
          password: $scope.password,
          rememberme: $scope.rememberme 
        }
      };

      AuthService.login(credentials,
        function(res) {
          $scope.user.isLoggedIn = true;
          // Set username on the parent scope as this
          // is displayed in the main app controller on load.
          $scope.$parent.userName = res.username;
          $location.path(urlToGoToAfterLogin.url);
          urlToGoToAfterLogin.url = '/';
        },
        function(err) {
          $scope.errors = [err];
        }
      );
    }
    $scope.events = [
      {title: 'All Day Event',start: new Date()},
      {title: 'Long Event',start: new Date(),end: new Date()},
      {id: 999,title: 'Repeating Event',start: new Date(),allDay: false}
    ];
    $scope.eventSources = [
      $scope.events
    ];
}]);

