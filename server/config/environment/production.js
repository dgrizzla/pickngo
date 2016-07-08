'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          9000,
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
  
  uploadPath : function() {
    return process.platform == 'linux' ? './server/components/upload/'  : 'server/components/upload/';
    
  },

  uploadDirectory :function () {
    return process.platform == 'linux' ? '/home/pickandgo/'  : 'home/pickandgo';
  },
  appFilesPath : function() {
    return process.platform == 'linux' ? '/home/pickandgo/'  : 'home/pickandgo';
  }        
};
