'use strict';

var app = require('../..');
import request from 'supertest';

describe('Categoria API:', function() {

  describe('GET /api/categorias', function() {
    var categorias;

    beforeEach(function(done) {
      request(app)
        .get('/api/categorias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          categorias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      categorias.should.be.instanceOf(Array);
    });

  });

});
