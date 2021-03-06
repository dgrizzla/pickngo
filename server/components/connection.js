const mysql = require("mysql");
const Promise = require('bluebird');
const _ = require('lodash');
const config = require('../config/environment');
const response = require('./utils/response.js');
const { noopA } = require('./utils/noop.js');
let pool = mysql.createPool(_.merge(
  config.mysql,
  {connectionLimit: 10}
));

pool.on('enqueue', function () {
  console.log('**************************************');
  console.log('Waiting for available connection slot');
});
pool.on('error', function () {
  console.log('**************************************');
  console.log('error');
});


const execute = (query, data, cb) => new Promise((resolve, reject) => {
  if (!cb && typeof data === 'function') {
    cb = data;
    data = undefined;
  }
  pool.query(query, data, onQuery);
  function onQuery(err, rows) {
    if (err) {
      console.log(query, data, err);
      if (cb) cb(err);
      else reject(err);
      return;
    }

    if (!cb){
      return resolve(rows);
    }
    try {
      cb(err, rows);
    } catch (err) {
      if (config.isProduction) {
        console.log(err.stack);
      } else {
        throw err;
      }
    }
  }
});


exports.prepare = mysql.format;

exports.execute = execute;

exports.commonGet = function (query, cb, data) {
  console.log(data, cb);
  if (!cb && typeof data === 'function') {
    cb = data;
    data = undefined;
  }
  if (!cb) {
    console.log(data);
    return response.then(
      execute('call ' + query, data).then(rows => rows[0])
    );
  }
  execute('call ' + query, data, onQuery);
  function onQuery(err, rows) {
    var code = 0;
    if (err) {
      code = 1;
      rows = [];
    }
    cb(response.generate(code, err, rows[0]));
  }
};

exports.getOne = function (query, cb, data) {
  if (!cb && typeof data === 'function') {
    cb = data;
    data = undefined;
  }
  if (!cb) {
    return response.then(execute('call ' + query, data))
            .then(data => data[0][0]);
  }
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