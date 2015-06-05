'use strict';

angular.module('app')
.factory('AuthService',
['$http', '$cookieStore', '$location', '$state', 'urlToGoToAfterLogin',
  function($http, $cookieStore, $location, $state, urlToGoToAfterLogin){
  var emptyUser = { email: '', auth_token: ''};
  var currentUser = $cookieStore.get('user') || emptyUser;

  function changeUser(user) {
    angular.extend(currentUser, user);
    if(user == emptyUser)
      $cookieStore.remove('user');
    else
      $cookieStore.put('user', currentUser)
  }

  return {
    isLoggedIn: function(user) {
      if(user === undefined) {
        user = currentUser;
      }
      return user.email.length > 0;// && user.auth_token;
    },
    signUp: function(user, success, error) {
      $http.post('/users', user).success(function(res) {
        changeUser(res);
        success();
      }).error(error);
    },
    login: function(user, success, error) {
      $http.post('/users/sign_in', user).success(function(user){
        changeUser(user);
        success(user);
      }).error(error);
    },
    logout: function(success, error) {
      $http.delete('/users/sign_out').success(function(){
        changeUser(emptyUser);
        success(emptyUser);
      }).error(error);
    },
    setPageTryingToAccess: function(){
      urlToGoToAfterLogin.url = $location.url();
    },
    user: currentUser
  };
}]);
