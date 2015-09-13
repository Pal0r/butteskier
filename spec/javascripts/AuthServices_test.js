describe('AuthService', function() {
  beforeEach(module('app'));

  var factory = null,
    cookies = null,
    $httpBackend,
    $rootScope,
    authRequestHandler,
    // Set mock user data
    user = { email: 'test@gmail.com', auth_token: '1234', username: 'test_user', id: '1'};

  beforeEach(inject(function(AuthService, $cookieStore, $injector) {
    factory = AuthService;
    cookies = $cookieStore;
    cookies['user'] = user;

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');

    authRequestHandler = $httpBackend.when('POST', '/users/sign_in').
      respond(user=AuthService.user);

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
  }));

  it('should fetch a users auth token and login', function(){
    $httpBackend.expectPOST('/users/sign_in');
    expect(user['username']).toBe('test_user');
  });

  it('Should return users login status', function() {
    expect(factory.isLoggedIn(user)).toBe(true)
  });
});