'use strict';

describe('Component: PanelAdminComponent', function () {

  // load the controller's module
  beforeEach(module('pickngoApp'));

  var PanelAdminComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PanelAdminComponent = $componentController('PanelAdminComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
