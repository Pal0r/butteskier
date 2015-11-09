angular.module('app').controller("EditUserController",
  ['$scope', '$rootScope', 'AuthService', '$http', '$location', '$state', '$window',
  function ($scope, $rootScope, AuthService, $http, $location, $state, $window) {
      var currentUser = AuthService.user;
      $scope.user = currentUser;
      // Hide the ui-view blur background
      $scope.hideBackground = false;
      $scope.submitUserEditForm = function(){
        // Add user id to request payload
        $scope.userFormData.id = currentUser.id;
        $http.patch('users', $scope.userFormData)
          .success(function(response){
            // Reset form on success
            $scope.userFormData = {};
            // If username changed, set it
            if(currentUser.username != response.data.username){
              $scope.$parent.userName = response.data.username;
            }
          })
      };
      $scope.deleteUser = function(){

        $http.delete('/users')
        .success(function(){
          // Destroy session if successful
          AuthService.logout()
          // Redirect to index
          $state.go('homeState');
          $window.location.reload();
        })
      };
      // Add the user's profile img to the current user
      $scope.uploadOnSuccess = function(response){
        $scope.user.profile_img = response.data.profile_img
      }
      $scope.userFields = [
        {
          key: 'username',
          type: 'input',
          templateOptions: {
            label: 'Change Your Username',
            placeholder: currentUser.username
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            label: 'Update your email',
            placeholder: currentUser.email
          }
        }
      ];
    }
]);
