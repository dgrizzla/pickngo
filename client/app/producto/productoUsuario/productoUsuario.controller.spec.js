'use strict';

describe('Component: ProductoUsuarioComponent', function () {

  // load the controller's module
  beforeEach(module('pickngoApp'));

  var ProductoUsuarioComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ProductoUsuarioComponent = $componentController('ProductoUsuarioComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
