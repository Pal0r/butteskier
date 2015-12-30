describe('EditUserController', function(){
    var $controller, $httpBackend, authService, $cookieStore;
    var user = { email: 'test@gmail.com', auth_token: '1234', username: 'test_user', id: '1'};

    beforeEach(module('app'));

    beforeEach(inject(function(_$controller_, AuthService, _$httpBackend_, _$cookieStore_){
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $cookieStore = _$cookieStore_;
      authService = AuthService;
      $cookieStore.put('user', user);
    }));

    describe('EditUserController.$scope', function(){
      var $scope, controller, currentUser;

      beforeEach(function(){
        $scope = {};
        controller = $controller('EditUserController', { $scope: $scope });
        $scope.userFormData = {id: 1, username: "Palor", email: "ryan@mail.com"};
      });

      it('Should hide the bacground overlay', function(){
        expect($scope.hideBackground).toBe(false);
      });

      it('Should set the $scope user == the currentUser', function(){
        expect($scope.user.email).toBe(user.email);
      });

      it('Should set the users profile img', function(){
        var profImg = {data: 'http://remote_image_location'};
        $scope.uploadOnSuccess(profImg);
        expect($scope.user.profile_img).toBe(profImg['data']['profImg']);
      });

    });
});
