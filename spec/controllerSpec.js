

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

  it('should get all goals with `getUserGoals`', function () {
    var mockResponse = [
      { goalName: 'Do a thing',
        number: 4 },
      { goalName: 'Read a book',
        number: 8 }
    ];

    $httpBackend.expect('GET', 'api/goals/mock@mockmail.com').respond(mockResponse);

    Goals.getUserGoals('mock@mockmail.com').then(function (goals) {
      expect(goals.data).toEqual(mockResponse);
    });


    $httpBackend.flush();
  });

  it('should get a user with `findUser`', function () {
    var mockResponse =
      { name: 'Steve',
        sweatLevel: 11 };

    $httpBackend.expect('GET', 'api/users/mock@mockmail.com').respond(mockResponse);

    Goals.findUser('mock@mockmail.com').then(function (goals) {
      expect(goals.data).toEqual(mockResponse);
    });
    $httpBackend.flush();
  });

  it('should get a goal with `getProgress`', function () {
    var mockResponse = [
      { goalName: 'Do a thing',
        number: 4 },
      { goalName: 'Read a book',
        number: 8 }
    ];

    $httpBackend.expect('GET', 'api/progress/mock@mockmail.com').respond(mockResponse);

    Goals.getProgress('mock@mockmail.com').then(function (goals) {
      expect(goals.data).toEqual(mockResponse);
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
  });

});

/*
describe('Dashboard Controller', function() {
  var Goals, vm, $rootScope, createController, DashboardCtrl, $httpBackend;

  beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_$httpBackend_, _GoalFactory_, _DashboardCtrl_) {
      $httpBackend = _$httpBackend_;
      Goals = _GoalFactory_;
      Dash = _DashboardCtrl_;
  }));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));

  // A simple test to verify the Goals factory exists
  it('should exist', function() {
    expect(Dash).toBeDefined();
    //expect(Dash.vm.renderGoals).toBeDefined();
  });


});
*/

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