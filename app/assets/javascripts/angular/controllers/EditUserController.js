angular.module('app').controller("EditUserController",
  ['$scope', '$rootScope', 'AuthService', '$http', '$location', '$state', '$window',
  function ($scope, $rootScope, AuthService, $http, $location, $state, $window) {
      var currentUser = AuthService.user;
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
      // TODO: This should actually launch a confirmation modal.
      // Also upon deletion, we should delete all the user's records.
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
          key: 'userInstaProfile',
          type: 'checkbox',
          templateOptions: {
            label: 'Use Your Instagram Profile Image'
          }
        },
        {
          key: 'instagram_profile',
          type: 'input',
          templateOptions: {
            label: 'Your Instagram Profile',
            placeholder: 'The URL'
          },
          hideExpression: '!model.userInstaProfile'
        }
      ];
    }
]);
