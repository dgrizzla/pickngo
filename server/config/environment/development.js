'use strict';

// Development specific configuration
// ==================================
const uploadDirectory = process.platform === 'linux' ? (process.env.USER === 'a' ? 'files' : '/home/pickandgo/') : 'home/pickandgo';
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
  _uploadDirectory: uploadDirectory,
  uploadDirectory :function () {
    return '/home/pickandgo/'
  },
  appFilesPath : () => uploadDirectory
};
