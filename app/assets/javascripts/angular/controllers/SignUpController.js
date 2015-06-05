angular.module('app').controller("SignUpController",
  ['$location', '$scope', 'AuthService',
  function ($location, $scope, AuthService) {
    if(AuthService.isLoggedIn()){
      $location.path('/');
    }

    $scope.signUp = function () {
      var credentials = {
        user: {
          email: $scope.email,
          password: $scope.password,
          password_confirmation: $scope.password_confirmation
        }
      };

      AuthService.signUp(credentials,
        function() {
            $location.path('/');
        },
        function(err) {
            $scope.errors = err.messages;
        }
      );
    }
}]);
