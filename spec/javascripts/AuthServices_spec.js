describe('AuthService', function() {
  beforeEach(module('app'));

  var factory = null,
    cookies = null,
    $httpBackend,
    $rootScope,
    authRequestHandler,
    $log,
    // Set mock user data
    user = { email: 'test@gmail.com', auth_token: '1234', username: 'test_user', id: '1'};

  beforeEach(inject(function(AuthService, $cookieStore, $injector, _$log_) {
    factory = AuthService;
    cookies = $cookieStore;
    $log = _$log_;
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    authRequestHandler = $httpBackend.when('POST', '/users/sign_in').
      respond(cookies['user'] = user);
  }));

  it('Should return false when a user is not logged in', function(){
    expect(factory.isLoggedIn()).toBe(false)
  });

  it('Should return users login status', function() {
    expect(factory.isLoggedIn(user)).toBe(true)
  });
});
