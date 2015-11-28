describe('AppController', function(){
  beforeEach(module('app'));
  var $controller, authService;

  beforeEach(inject(function(_$controller_, AuthService){
    $controller = _$controller_;
    authService = AuthService;
  }));

  describe('AppController.$scope', function(){
    var $scope, controller;

    beforeEach(function(){
      $scope = {};
      controller = $controller('AppController', { $scope: $scope });
    });

    it('Should return false as a default for a signed in user', function(){
      expect($scope.user.isLoggedIn).toBe(false);
    });

    it('Should hide the background', function(){
      expect($scope.hideBackground).toBe(true);
    });

    it('Should logout a user', function(){
      var cookies, user;
      // First create a logged in user
      user = { email: 'test@gmail.com', auth_token: '1234', username: 'test_user', id: '1'};
      inject(function($cookieStore){
        cookies = $cookieStore;
      });
      // Set logged in user cookies
      cookies['user'] = user;
      // Test that the user is currently logged in
      expect(authService.isLoggedIn(user)).toBe(true);
      // Now log the user out
      $scope.logout();
      expect($scope.user.isLoggedIn).toBe(false);

      //TODO: This should also test the statechange.
    });
  });
});
