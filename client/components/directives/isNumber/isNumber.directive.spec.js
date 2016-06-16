'use strict';

describe('Directive: isNumber', function () {

  // load the directive's module
  beforeEach(module('pickngoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<is-number></is-number>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the isNumber directive');
  }));
});
