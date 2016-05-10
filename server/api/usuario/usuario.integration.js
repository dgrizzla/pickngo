'use strict';

var app = require('../..');
import request from 'supertest';

describe('Usuario API:', function() {

  describe('GET /api/usuarios', function() {
    var usuarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuarios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      usuarios.should.be.instanceOf(Array);
    });

  });

});
