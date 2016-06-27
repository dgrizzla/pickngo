'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadCtrlStub = {
  index: 'uploadCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var uploadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './upload.controller': uploadCtrlStub
});

describe('Upload API Router:', function() {

  it('should return an express router instance', function() {
    uploadIndex.should.equal(routerStub);
  });

  describe('GET /components/upload', function() {

    it('should route to upload.controller.index', function() {
      routerStub.get
        .withArgs('/', 'uploadCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
