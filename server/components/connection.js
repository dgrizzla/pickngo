'use strict';
const mysql = require("mysql");
const _ = require('lodash');
const config = require('../config/environment');
const response = require('./utils/response.js');
const { noopA } = require('./utils/noop.js');
let pool = mysql.createPool(_.merge(
  config.mysql,
  {connectionLimit : 10}
));

pool.on('enqueue', function () {
  console.log('**************************************');
  console.log('Waiting for available connection slot');
});
pool.on('error', function () {
  console.log('**************************************');
  console.log('error');
});


function execute (query, data, cb) {
  if(!cb) {
    cb = data;
    data = undefined;
  };
  pool.query(query, data, onQuery);
  function onQuery(err, rows) {
    if (err) {
      console.log(query, data, err);
    }

    if (!cb){
      return;
    }
    try {
      cb(err, rows);
    } catch (e) {
      if (config.isProduction) {
        console.log(e.stack);
      } else {
        throw e;
      }
    }
  }
};

exports.prepare = mysql.format;

exports.execute = execute;

exports.commonGet = function (query, cb, data) {
  if(!cb) {
    cb = data;
    data = undefined;
  };
  execute('call ' + query, data, onQuery);
  function onQuery(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    };
    cb(response.generate(code, err, rows[0]));
  }
};

exports.getOne = function (query, cb, data) {
  if(!cb) {
    cb = data;
    data = undefined;
  };
  execute('call ' + query, data, onQuery);
  function onQuery(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    } else {
      rows[0] = (rows[0] || noopA)[0];
    }
    cb(response.generate(code, err, rows[0]));
  }
};

exports.commonPost = function (query, cb, data) {
  execute('select ' + query + ' as id', data, onQuery);
  function onQuery(err, rows) {
    console.log('ins', rows);
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    } else {
      rows[0] = rows[0].id;
    }
    cb(response.generate(code, err, rows[0]));
  }
};