'use strict';

var app = require('../..');
import request from 'supertest';

describe('Tipo API:', function() {

  describe('GET /api/tipos', function() {
    var tipos;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tipos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tipos.should.be.instanceOf(Array);
    });

  });

});
