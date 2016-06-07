'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var subcategoriaCtrlStub = {
  index: 'subcategoriaCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var subcategoriaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './subcategoria.controller': subcategoriaCtrlStub
});

describe('Subcategoria API Router:', function() {

  it('should return an express router instance', function() {
    subcategoriaIndex.should.equal(routerStub);
  });

  describe('GET /api/subcategorias', function() {

    it('should route to subcategoria.controller.index', function() {
      routerStub.get
        .withArgs('/', 'subcategoriaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
