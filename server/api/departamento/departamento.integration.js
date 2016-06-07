'use strict';

var app = require('../..');
import request from 'supertest';

describe('Departamento API:', function() {

  describe('GET /api/departamentos', function() {
    var departamentos;

    beforeEach(function(done) {
      request(app)
        .get('/api/departamentos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          departamentos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      departamentos.should.be.instanceOf(Array);
    });

  });

});
