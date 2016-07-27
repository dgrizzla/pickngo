'use strict';

require('angular-http-auth');
require('angular-file-upload');

window.PICKNGO = angular.module('pickngoApp', [
  'pickngoApp.constants',
  require('angular-cookies'),
  require('angular-resource'),
  'http-auth-interceptor',
  require('angular-sanitize'),
  require('angular-ui-router'),
  require('angular-ui-bootstrap'),
  require('angular-ui-notification'),
  'angularFileUpload'
]);