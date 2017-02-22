

describe('Test', function() {
  // A simple test to verify the test exists
  it('should exist', function() {
    var test = 1;
    expect(test).toBeDefined();
  });
});


describe('Goals factory', function() {
  var Goals, vm, $rootScope, createController, DashboardCtrl, $httpBackend;

  beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_$httpBackend_, _GoalFactory_) {
      $httpBackend = _$httpBackend_;
      Goals = _GoalFactory_;
  }));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  // A simple test to verify the Goals factory exists
  it('should exist', function() {
    expect(Goals).toBeDefined();
    expect(Goals.findOrCreateUser).toBeDefined();
  });

  it('should have a method `getUserGoals`', function () {
    expect(Goals.getAll).to.be.a('function');
  });

  xit('should have a method `addOne`', function () {
    expect(Goals.addOne).to.be.a('function');
  });

  xit('should get all links with `getAll`', function () {
    var mockResponse = [
      { title: 'Twitter',
        url: 'https://twitter.com' },
      { title: 'Reddit',
        url: 'https://reddit.com/r/javascript' }
    ];

    $httpBackend.expect('GET', '/api/links').respond(mockResponse);

    Goals.getAll().then(function (links) {
      expect(links).to.deep.equal(mockResponse);
    });

    $httpBackend.flush();
  });

  xit('should add a new link with `addOne`', function () {
    var github = { url: 'https://github.com/reactorcore' };

    $httpBackend
      .expect('POST', '/api/links', JSON.stringify(github))
      .respond(201, {
        url: 'https://github.com/reactorcore',
        title: 'reactorcore'
      });

    Goals.addOne(github).then(function (resp) {
      expect(resp.status).to.equal(201);
      expect(resp.data.title).to.equal('Hack Reactor Labs');
    });

    $httpBackend.flush();
  });

});


/*
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('DashboardCtrl', {
        $scope: $scope,
        Goals: Goals,
        vm: $rootScope.$new()
      });
    };

  }));

  it('should have a goal property on the vm', function () {
    //createController();
    expect(vm).to.be.an('object');
  });
*/