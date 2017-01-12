'use strict';

describe('Controller: EditApplicationCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var EditApplicationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditApplicationCtrl = $controller('EditApplicationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditApplicationCtrl.awesomeThings.length).toBe(3);
  });
});
