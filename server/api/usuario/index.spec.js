'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usuarioCtrlStub = {
  index: 'usuarioCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var usuarioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './usuario.controller': usuarioCtrlStub
});

describe('Usuario API Router:', function() {

  it('should return an express router instance', function() {
    usuarioIndex.should.equal(routerStub);
  });

  describe('GET /api/usuarios', function() {

    it('should route to usuario.controller.index', function() {
      routerStub.get
        .withArgs('/', 'usuarioCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
