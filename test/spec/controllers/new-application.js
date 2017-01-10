'use strict';

describe('Controller: NewApplicationCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var NewApplicationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewApplicationCtrl = $controller('NewApplicationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewApplicationCtrl.awesomeThings.length).toBe(3);
  });
});
