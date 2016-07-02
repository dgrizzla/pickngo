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
          
  uploadPath : function() {
    return 'server/components/upload/';
  },

  uploadDirectory :function () {
    return '/home/pickandgo/'
  },
  appFilesPath : function() {
    return process.platform == 'linux' ? '/home/pickandgo/'  : 'home/pickandgo';
  }        
};
