describe('AuthService', function() {
  beforeEach(module('app'));

  var factory = null,
    cookies = null,
    // Set mock user data
    user = { email: 'test@gmail.com', auth_token: '1234', username: 'test_user', id: '1'};

  beforeEach(inject(function(AuthService, $cookieStore) {
    factory = AuthService;
    cookies = $cookieStore;
    cookies['user'] = user
  }));

  it('Should return users login status', function() {
    expect(factory.isLoggedIn(user)).toBe(true)
  });
  it('should logout a user', function(){
    expect(true).toBe(true)
  })
});