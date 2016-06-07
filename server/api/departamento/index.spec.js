'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var departamentoCtrlStub = {
  index: 'departamentoCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var departamentoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './departamento.controller': departamentoCtrlStub
});

describe('Departamento API Router:', function() {

  it('should return an express router instance', function() {
    departamentoIndex.should.equal(routerStub);
  });

  describe('GET /api/departamentos', function() {

    it('should route to departamento.controller.index', function() {
      routerStub.get
        .withArgs('/', 'departamentoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
