'use strict';

var crypto = require("crypto");

function verifyPassword(hash, password) {
  var newHash = encryptPassword(password);
  return newHash == hash;
}

function randomNumber(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function secretKey() {
  return '$m10$p1x' + crypto.createHash('sha1').update(randomNumber(0,10).toString()).digest('hex').substr(0,22);
}

function encryptPassword(password) {
  return crypto.createHash('sha1', secretKey()).update(password).digest('hex');
}

module.exports = {
  verifyPassword,
  encryptPassword
};
