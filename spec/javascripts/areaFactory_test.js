describe('Area Factory', function() {
  beforeEach(module('app'));

  var factory,
    $httpBackend,
    $rootScope;

  beforeEach(inject(function(areaFactory, $injector) {
    factory = areaFactory;
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend
      .when('GET', '/v1/areas/')
      .respond(200, {
        areas: [
        {name: "Tumalo", id: 1, lat: "44.0051", long: "-121.6425"},
        {name: "The Cone", id: 2, lat: "44.0015", long: "-121.6869"}
      ]})
  }));

  it('should fetch a users auth token and login', function(){
    console.log($httpBackend.GET('/v1/areas/'));
  });
});