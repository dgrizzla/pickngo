'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var categoriaCtrlStub = {
  index: 'categoriaCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var categoriaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './categoria.controller': categoriaCtrlStub
});

describe('Categoria API Router:', function() {

  it('should return an express router instance', function() {
    categoriaIndex.should.equal(routerStub);
  });

  describe('GET /api/categorias', function() {

    it('should route to categoria.controller.index', function() {
      routerStub.get
        .withArgs('/', 'categoriaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
