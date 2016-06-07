'use strict';

var app = require('../..');
import request from 'supertest';

describe('Subcategoria API:', function() {

  describe('GET /api/subcategorias', function() {
    var subcategorias;

    beforeEach(function(done) {
      request(app)
        .get('/api/subcategorias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          subcategorias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      subcategorias.should.be.instanceOf(Array);
    });

  });

});
