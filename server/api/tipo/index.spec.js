'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tipoCtrlStub = {
  index: 'tipoCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var tipoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipo.controller': tipoCtrlStub
});

describe('Tipo API Router:', function() {

  it('should return an express router instance', function() {
    tipoIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos', function() {

    it('should route to tipo.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tipoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
