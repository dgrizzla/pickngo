'use strict';

var app = require('../..');
import request from 'supertest';

describe('Upload API:', function() {

  describe('GET /components/upload', function() {
    var uploads;

    beforeEach(function(done) {
      request(app)
        .get('/components/upload')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          uploads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      uploads.should.be.instanceOf(Array);
    });

  });

});
