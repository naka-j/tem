'use strict';

describe('Controller: ApplicationNewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ApplicationNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplicationNewCtrl = $controller('ApplicationNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ApplicationNewCtrl.awesomeThings.length).toBe(3);
  });
});
