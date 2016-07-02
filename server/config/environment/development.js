'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Seed database on startup
  seedDB: true,

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
