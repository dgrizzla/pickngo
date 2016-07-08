'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Seed database on startup
  seedDB: true,

  uploadPath : function() {
    return 'server/components/upload/';
  },

  mysql: {
    connectionLimit : 10,
    database : 'pickandgo',
    host : 'localhost',
    user : 'root',
    password : 'root'
  },

  redisConfig: {
      host: '127.0.0.1',
      port: 6379
  },
  
  uploadDirectory :function () {
    return '/home/pickandgo/'
  },
  appFilesPath : function() {
    return process.platform == 'linux' ? '/home/pickandgo/'  : 'home/pickandgo';
  }
};
