'use strict';

describe('Component: EditarProductoComponent', function () {

  // load the controller's module
  beforeEach(module('pickngoApp'));

  var EditarProductoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditarProductoComponent = $componentController('EditarProductoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
