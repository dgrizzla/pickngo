'use strict';

describe('Controller: CrearProductoCtrl', function () {

  // load the controller's module
  beforeEach(module('pickngoApp'));

  var CrearProductoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearProductoCtrl = $controller('CrearProductoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
